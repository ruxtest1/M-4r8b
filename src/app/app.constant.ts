export const DEFAULT = {
    "config": {
        "debug": false,
        // "protocol": "http://",
        // "host": "localhost",
        // "port": 4942,
        // "protocol": "http://",
        // "host": "ruxnutt.thddns.net",
        // "host": "localhost",
        // "port": 4942,
        'protocol': 'https://',
        'host': 'marukyo-api.appspot.com',
        'port': '',
        "checkAuthen": "/current",
        "loginPage": "login",
        "cookie_name": {
            "building": "building_data"
        },
        "property": {
            "propertyType": "/api/property-types",
            "properties": "/api/accounts/:account_id/properties",
            "facilities": "/api/accounts/:account_id/facilities",
            "propertyAdd": "/api/properties/wizard"
        },
        "home": {
            "propertiesBuildings": "/api/accounts/:account_id/properties-buildings",
            "buildingsRoom": "/api/buildings/:building_id",
            "roomDetail": "/api/rooms/:room_id",
            "saveRooms": "/api/rooms/:room_id",
            "propertiesBuildingsList": "/api/accounts/:account_id/properties-buildings-list",
            "getCleanings": "/api/cleanings/",
            "putCleanings": "/api/cleanings/",
            "postCleanings": "/api/cleanings/",
            "getRepairs": "/api/repairs/",
            "putRepairs": "/api/repairs/",
            "postRepairs": "/api/repairs/",
            "getMoveOut": "/api/move-outs/",
            "postMoveOut": "/api/move-outs",
            "putMoveOut": "/api/move-outs/",
            "putContract": "/api/contracts/",
            "postContract": "/api/contracts"
        },
        "lifeType": {
            "list": "/api/life-types/user/:user_id",
            "add": "/api/life-types",
            "edit": "/api/life-types/:id",
            "delete": "/api/life-types/:id",
        },
        "userApi": {
            "login": "/api/Scusers/user-login",
            "logout": "/api/users/logout",
            "list": "/api/users/:account_id/list",
            "edit": "/api/users/",
            "create": "/api/users/:account_id/create",
            "delete": "/api/users/",
            "edit_password": "/api/users/editpassword",
            "forget_password": "/api/Scusers/forget-password",

            "getAnnounce": "/api/buildings/",
            "getRental": "/api/rooms/",
            "updatePersonal": "/api/member/:id",
            "editPassword": "/api/member/:id/edit-password",
            "getContract": "/api/rooms/:room_id/contracts",
            "getBankAccount": "/api/accounts/4/bank-accounts",
            "getRoomContracts": "/api/rooms/:room_id/contracts",
            "getBuilding": "/api/buildings/:building_id/view",
            "upload": "http://27.254.62.79:13022/api/HTP/upload"
        },
        "milkHistories": {
            "list": "/api/milk-histories",
            "add": "/api/milk-histories",
            "edit": "/api/milk-histories/:id",
            "delete": "/api/milk-histories/:id",
            "last_create": "/api/milk-histories/last-create",
        },
        'category': {
            'list': '/api/categories/find',
            'add': '/api/categories',
            'view': '/api/categories/:id',
            'edit': '/api/categories/:id',
            'delete': '/api/categories/:id',
            'catMain': '/api/categories/cat-main',
            'catSub': '/api/categories/cat-sub',
            'catGroup': '/api/categories/cat-group',
            'upload': '/api/containers/categories/upload',
            'viewImage': '/api/containers/categories/download/:file_name',
            'getProduct': '/api/categories/:id/get-product',
        },
        'product': {
            'list': '/api/products/find',
            'add': '/api/products',
            'view': '/api/products/:id',
            'view_buy': '/api/products/:id/buy',
            'edit': '/api/products/:id',
            'delete': '/api/products/:id',
            'clone': '/api/products/clone',
            'search': '/api/products/search',
            'image': {
                'upload': '/api/containers/products/upload',
                'view': '/api/containers/products/download/:file_name',
                'delete': '/api/containers/products/files/:file_name',
            },
        },
        'video': {
            'list': '/api/videos/find',
        },
        'map': {
            'list': '/api/maps/find',
        },
        'bank': {
            'list': '/api/banks/find',
        },
        'vendor': {
            'create': '/api/vendors/register',
            'file': {
                'upload': '/api/containers/vendor-files/upload',
                'view': '/api/containers/vendor-files/download/:file_name',
                'delete': '/api/containers/vendor-files/:file_name',
            },
            'image': {
                'upload': '/api/containers/vendor-images/upload',
                'view': '/api/containers/vendor-images/download/:file_name',
                'delete': '/api/containers/vendor-images/files/:file_name',
            }
        },
        'buyProduct': {
            'shippingMethodList': '/api/shipping-methods/find',
        }
    }
};
