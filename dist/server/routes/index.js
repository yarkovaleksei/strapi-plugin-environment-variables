"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: 'GET',
        path: '/environment-variables',
        handler: 'environmentVariablesController.index',
        config: {
            policies: [
                'admin::isAuthenticatedAdmin',
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: [
                            'plugin::environment-variables.settings.read',
                        ],
                    },
                },
            ],
        },
    },
];
