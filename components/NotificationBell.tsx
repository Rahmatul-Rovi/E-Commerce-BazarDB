"use client";

type Notification = {
  id: string;
  message: string;
  orderId: string | null;
  isRead: boolean;
  createdAt: string;
};