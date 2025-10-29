
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

// DELETE user
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true, role: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get target user
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, role: true, email: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'Target user not found' },
        { status: 404 }
      );
    }

    // Prevent self-deletion
    if (currentUser.id === targetUser.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Check permissions
    if (currentUser.role === 'admin') {
      return NextResponse.json(
        { error: 'Admins cannot delete users' },
        { status: 403 }
      );
    }

    // Super Admin can only delete admin users
    if (currentUser.role === 'super_admin') {
      if (targetUser.role !== 'admin') {
        return NextResponse.json(
          { error: 'Super Admins can only delete admin users' },
          { status: 403 }
        );
      }
    }

    // Developer can delete any user (super_admin or admin)
    if (currentUser.role === 'developer') {
      if (!['super_admin', 'admin'].includes(targetUser.role)) {
        return NextResponse.json(
          { error: 'Cannot delete this user type' },
          { status: 403 }
        );
      }
    }

    // Delete user
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { message: 'User deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}

// PATCH update user role or details
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true, role: true },
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, email, role } = body;

    // Get target user
    const targetUser = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, role: true },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'Target user not found' },
        { status: 404 }
      );
    }

    // Check permissions
    if (currentUser.role === 'admin') {
      return NextResponse.json(
        { error: 'Admins cannot update users' },
        { status: 403 }
      );
    }

    // Build update data
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) {
      // Super Admin can only modify admin roles
      if (currentUser.role === 'super_admin' && role !== 'admin') {
        return NextResponse.json(
          { error: 'Super Admins can only set admin role' },
          { status: 403 }
        );
      }
      updateData.role = role;
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}
