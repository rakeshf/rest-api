const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    OPTION: 'OPTION'
  };
  
  module.exports.config = {
    protect: [
      {
        path: '/api/'+process.env.VERSION+'/user/profile/:user_id',
        methods: [methods.POST, methods.GET, methods.PUT],
        rols: ['user']
      },
      {
        path: '/api/'+process.env.VERSION+'/posts',
        methods: [methods.POST, methods.GET, methods.PUT],
        rols: ['user']
      }
    ]
  };