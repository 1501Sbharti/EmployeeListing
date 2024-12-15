import { createServer, Model } from 'miragejs';

export function makeServer() {
  createServer({
    models: {
      employee: Model,
    },

    seeds(server) {
      server.db.loadData({
        employees: [
          { id: 1, name: 'John Doe', role: 'Developer', department: 'Engineering' },
          { id: 2, name: 'Jane Smith', role: 'Designer', department: 'Design' },
        ],
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/employees', (schema) => schema.db.employees);
      this.post('/employees', (schema, request) => {
        const data = JSON.parse(request.requestBody);
        return schema.db.employees.insert(data);
      });
      this.put('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const data = JSON.parse(request.requestBody);
        return schema.db.employees.update(id, data);
      });
      this.del('/employees/:id', (schema, request) => {
        const id = request.params.id;
        schema.db.employees.remove(id);
        return { message: `Employee with ID ${id} was successfully deleted.` };
      });
    },
  });
}
