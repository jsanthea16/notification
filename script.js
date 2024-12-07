const notifications = JSON.parse(localStorage.getItem('notifications')) || [
    { id: 1, text: "Election Day is August 8, 2025", read: false, timestamp: new Date().toLocaleString() },
    { id: 2, text: "Voter registration deadline is July 7, 2025", read: false, timestamp: new Date().toLocaleString() },
    { id: 3, text: "Early voting starts on July 23, 2025", read: false, timestamp: new Date().toLocaleString() },
];

const notificationList = document.getElementById('notificationList');
const notificationBell = document.getElementById('notificationBell');
const unreadCount = document.getElementById('unreadCount');

// Render Notifications
function renderNotifications() {
    notificationList.innerHTML = '';
    let unreadCountValue = 0;

    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.className = notification.read ? 'read' : 'unread';
        li.innerHTML = `
            <div>
                <strong>${notification.text}</strong>
                <small style="display: block; font-size: 0.8rem; color: #666;">${notification.timestamp}</small>
            </div>
            <button class="mark-read-btn" onclick="markAsRead(${notification.id})"></button>
        `;
        notificationList.appendChild(li);
        if (!notification.read) unreadCountValue++;
    });

    unreadCount.textContent = unreadCountValue;
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Add Notification
document.getElementById('addNotificationBtn').onclick = () => {
    const text = prompt('Enter a new notification:');
    if (text) {
        notifications.push({ id: Date.now(), text, read: false, timestamp: new Date().toLocaleString() });
        renderNotifications();
    }
};

// Clear Notifications
document.getElementById('clearNotificationsBtn').onclick = () => {
    notifications.length = 0;
    renderNotifications();
};

// Mark as Read
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = true;
        renderNotifications();
    }
}

// Initialize
renderNotifications();
