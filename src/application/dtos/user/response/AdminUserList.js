class AdminUserListItem {
    constructor(user) {
        this.id = user.id.toString();
        this.username = user.username;
        this.email = user.email;
        this.role = user.role;
        this.fullName = user.profile.fullName;
        this.isActive = user.isActive;
        this.createdAt = user.createdAt.toISOString();
        this.lastLogin = user.lastLogin || null;
    }
}

class AdminUserList {
    constructor(users, pagination) {
        this.data = users.map(u => new AdminUserListItem(u));
        this.pagination = {
            page: pagination.page || 1,
            limit: pagination.limit || 20,
            total: pagination.total || users.length,
            totalPages: Math.ceil((pagination.total || users.length) / (pagination.limit || 20))
        };
    }
}
module.exports = { AdminUserListResponse, AdminUserList };