import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminUser } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: 'Admin authorization required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'month';
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    const now = new Date();
    let startDate: Date;
    let endDate = new Date(now);

    if (period === 'today') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (period === 'week') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (period === 'year') {
      startDate = new Date(now.getFullYear(), 0, 1);
    } else if (period === 'custom' && startDateParam) {
      startDate = new Date(startDateParam);
      if (endDateParam) {
        endDate = new Date(endDateParam);
        endDate.setHours(23, 59, 59, 999);
      }
    } else {
      // Default: Last 30 days
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Fetch orders in date range
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        milestones: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Also fetch all orders for overall pipeline distribution
    const allOrders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Calculate revenue and counts
    let totalRevenue = 0;
    let validOrdersCount = 0;

    const statusCounts = {
      CONFIRMED: 0,
      CASTING: 0,
      PACKING: 0,
      DISPATCHED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };

    orders.forEach((o) => {
      const statusKey = o.status.toUpperCase() as keyof typeof statusCounts;
      if (statusCounts[statusKey] !== undefined) {
        statusCounts[statusKey]++;
      }
      if (statusKey !== 'CANCELLED') {
        totalRevenue += o.total;
        validOrdersCount++;
      }
    });

    const averageOrderValue = validOrdersCount > 0 ? totalRevenue / validOrdersCount : 0;

    // Top selling products tally
    const productStats: Record<string, { name: string; quantity: number; revenue: number; image?: string }> = {};
    
    orders.forEach((o) => {
      if (o.status.toUpperCase() !== 'CANCELLED') {
        try {
          const items = JSON.parse(o.items);
          items.forEach((item: any) => {
            const prodId = item.product?.id || item.id || 'unknown';
            const prodName = item.product?.name || 'Studio Piece';
            const prodImage = item.product?.image || '';
            const qty = item.quantity || 1;
            const price = item.product?.priceValue || 0;

            if (!productStats[prodId]) {
              productStats[prodId] = {
                name: prodName,
                quantity: 0,
                revenue: 0,
                image: prodImage,
              };
            }
            productStats[prodId].quantity += qty;
            productStats[prodId].revenue += qty * price;
          });
        } catch {}
      }
    });

    const topProducts = Object.values(productStats)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    // Sales trajectory breakdown
    const trajectoryMap: Record<string, { date: string; revenue: number; orders: number }> = {};
    orders.forEach((o) => {
      const d = o.createdAt.toISOString().split('T')[0];
      if (!trajectoryMap[d]) {
        trajectoryMap[d] = { date: d, revenue: 0, orders: 0 };
      }
      if (o.status.toUpperCase() !== 'CANCELLED') {
        trajectoryMap[d].revenue += o.total;
      }
      trajectoryMap[d].orders += 1;
    });

    const salesTrajectory = Object.values(trajectoryMap).sort((a, b) => a.date.localeCompare(b.date));

    // Summary counts for all active products, reviews, inquiries
    const totalProductsCount = await prisma.product.count();
    const activeInquiriesCount = await prisma.contactSubmission.count({
      where: { status: 'NEW' },
    });
    const pendingReviewsCount = await prisma.review.count({
      where: { isPublished: false },
    });

    return NextResponse.json({
      period,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      summary: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalOrders: orders.length,
        averageOrderValue: Math.round(averageOrderValue * 100) / 100,
        totalProductsCount,
        activeInquiriesCount,
        pendingReviewsCount,
      },
      statusCounts,
      pipelineSummary: {
        crafting: statusCounts.CASTING,
        packing: statusCounts.PACKING,
        dispatched: statusCounts.DISPATCHED,
        delivered: statusCounts.DELIVERED,
        confirmed: statusCounts.CONFIRMED,
        cancelled: statusCounts.CANCELLED,
        activeInStudio: statusCounts.CONFIRMED + statusCounts.CASTING + statusCounts.PACKING,
      },
      topProducts,
      salesTrajectory,
      recentOrders: orders.slice(0, 5).map((o) => ({
        id: o.id,
        createdAt: o.createdAt.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        status: o.status,
        total: o.total,
        guestEmail: o.guestEmail,
        carrier: o.carrier,
      })),
    });
  } catch (error: any) {
    console.error('[API] Admin analytics error:', error);
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 });
  }
}
