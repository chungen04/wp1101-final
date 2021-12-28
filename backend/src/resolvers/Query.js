const Query = {
    users(parent, args, context){
        if (!context.login) return null;
        return ['bob', 'jake'];
    }
};

export { Query as default };