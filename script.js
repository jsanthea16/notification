const notifications = JSON.parse(localStorage.getItem('notifications')) || [
    { id: 1, text: "Election Day is November 8, 2023", read: false, timestamp: new Date().toLocaleString() },
    { id: 2, text: "Voter registration deadline is October 7, 2023", read: false, timestamp: new Date().toLocaleString() },
    { id: 3, text: "Early voting starts on October 23, 2023", read: false, timestamp: new Date().toLocaleString() },
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
            ${notification.read ? '<span class="read-status">✔ Seen</span>' : ''}
        `;

        if (!notification.read) {
            li.onclick = () => markAsRead(notification.id); // Make the whole item clickable
            unreadCountValue++;
        }

        notificationList.appendChild(li);
    });

    unreadCount.textContent = unreadCountValue;
    localStorage.setItem('notifications', JSON.stringify(notifications));
}

// Mark Notification as Read
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
        notification.read = true;
        renderNotifications();
    }
}

// Initialize
renderNotifications();
