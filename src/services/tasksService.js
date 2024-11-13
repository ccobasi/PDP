import api from './api';

export const tasksService = {
  async fetchTasks() {
    const response = await api.get('tasks');
    return response.data;
  },
  async addTask(newTask) {
    const response = await api.post('tasks', newTask);
    return response.data;
  },
  async updateTask(updatedTask) {
    const response = await api.put(`tasks/${updatedTask.id}`, updatedTask);
    return response.data;
  },
  async deleteTask(taskId) {
    await api.delete(`tasks/${taskId}`);
  },
};
