export const sessions = new Map();
/**
 * Session structure:
 * token: {
 *   token: string,
 *   user: { id, email, role, name },
 *   createdAt: ISO string
 * }
 */
export const sessionsStore = {
  set(token, session) {
    sessions.set(token, session);
  },
  get(token) {
    return sessions.get(token);
  },
  remove(token) {
    sessions.delete(token);
  }
};
