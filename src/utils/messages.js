import localizeFilter from "@/filters/localize.filter";
export default {
    logout: `${localizeFilter('Messages_Logout')}`,
    login: `${localizeFilter('Messages_Login')}`,
    'auth/user-not-found': `${localizeFilter('Messages_Auth_NotFound')}`,
    'auth/wrong-password': `${localizeFilter('Messages_Auth_WrongPassword')}`,
    'auth/email-already-in-use': `${localizeFilter('Messages_Auth_EmailInUse')}`
}
