export default [
  {
    method: 'GET',
    path: '/environment-variables',
    handler: 'environmentVariablesController.index',
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
      ],
    },
  },
];
