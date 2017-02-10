Ext.define('Melisa.ux.avatar.LocalStorage', {
    singleton: true,
    
    constructor: function() {
        
        var me = this,
            avatar = Ext.manifest.melisa.avatar,
            user = Ext.manifest.melisa.user,
            drive = Ext.manifest.melisa.modules.drive,
            localStorage = Ext.create('Ext.util.LocalStorage', {
                id: 'login'
            }),
            storeUsers = Ext.create('Ext.data.Store', {
                fields: ['id', 'idUser', 'idFileAvatar', 'idAvatar', 'lastUpdated', 'email', 'name'],
                proxy: {
                    type: 'localstorage',
                    id: 'login-users'
                }
            }),
            cacheUrlAvatar,
            recordAvatar;
    
        if( !avatar || !Ext.isObject(avatar)) {
            console.log('no avatar');
            return;
        }
    
        if( !drive) {
            console.log('no drive url');
            return;
        }
        
        localStorage.setItem('urlAvatar', drive);  
        
        cacheUrlAvatar = avatar.updatedAt ? avatar.updatedAt : avatar.createdAt;
        storeUsers.load();
        recordAvatar = storeUsers.findRecord('idUser', avatar.idUser);
        storeUsers.each(function(record) {
            record.set('lastUser', false);
        });
        
        if( !recordAvatar) {            
            storeUsers.add({
                idAvatar: avatar.id,
                idUser: avatar.idUser,
                idFileAvatar: avatar.idFileAvatar,
                lastUpdated: new Date(cacheUrlAvatar).getTime(),
                email: user.email,
                name: user.name,
                lastUser: true
            });            
        } else {
            
            recordAvatar.set({
                lastUpdated: new Date(cacheUrlAvatar).getTime(),
                lastUser: true
            });            
            recordAvatar.save();
            
        }
        
        storeUsers.sync();
        
        /* necesary, facil extract in login screen */
        localStorage.setItem('usersAvatars', Ext.encode(Ext.Array.pluck(storeUsers.data.items, 'data')));
        
    }
    
});
