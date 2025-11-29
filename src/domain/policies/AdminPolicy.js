class AdminPolicy {
    static canDoAnything(actor) {
        return actor.isAdmin();
    }
}
module.exports = AdminPolicy;
