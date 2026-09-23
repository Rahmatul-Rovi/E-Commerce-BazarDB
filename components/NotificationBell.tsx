"use client";

type Notification = {
  id: string;
  message: string;
  orderId: string | null;
  isRead: boolean;
  createdAt: string;
};

export default function NotificationBell() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const loadNotifications = () => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      });
  };

  useEffect(() => {
    if (session?.user) {
      loadNotifications();
      const interval = setInterval(loadNotifications, 30000); 
      return () => clearInterval(interval);
    }
  }, [session]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   const handleOpen = async () => {
    setOpen(!open);
    if (!open && unreadCount > 0) {
      await fetch("/api/notifications", { method: "PATCH" });
      setUnreadCount(0);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  if (!session?.user) return null;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={handleOpen}
        className="relative flex items-center text-gray-700 hover:text-primary transition-colors p-1"
      >
        <Bell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
            {unreadCount}
          </span>
        )}
      </button>