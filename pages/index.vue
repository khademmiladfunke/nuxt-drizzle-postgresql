<template>
    <div>
      <form @submit.prevent="isEditing ? updateUser() : createUser()">
        <input v-model="name" placeholder="Name" required />
        <input v-model="family" placeholder="Family" required />
        <button type="submit">{{ isEditing ? 'Update User' : 'Create User' }}</button>
        <button v-if="isEditing" @click="cancelEdit">Cancel</button>
      </form>
  
      <h2>Users</h2>
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.name }} - {{ user.family }}
          <button @click="deleteUser(user.id)">Delete</button>
          <button @click="editUser(user)">Edit</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const name = ref('');
  const family = ref('');
  const users = ref([]);
  const isEditing = ref(false); // To track if we are editing a user
  const currentUserId = ref(null); // To track the ID of the user being edited
  
  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    users.value = data.data;
  };
  
  const createUser = async () => {
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.value, family: family.value }),
    });
    resetForm(); // Reset form after adding
    fetchUsers(); // Refresh users after adding
  };
  
  const deleteUser = async (id) => {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    fetchUsers(); // Refresh users after deletion
  };
  
  const editUser = (user) => {
    name.value = user.name; // Fill the form with the user's details
    family.value = user.family;
    isEditing.value = true; // Set editing mode
    currentUserId.value = user.id; // Set the ID of the user being edited
  };
  
  const updateUser = async () => {
    await fetch(`/api/users/${currentUserId.value}`, {
      method: 'PUT', // Use PUT for updating
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name.value, family: family.value }),
    });
    resetForm(); // Reset form after updating
    fetchUsers(); // Refresh users after updating
  };
  
  const cancelEdit = () => {
    resetForm(); // Reset form and exit editing mode
  };
  
  const resetForm = () => {
    name.value = '';
    family.value = '';
    isEditing.value = false; // Reset editing state
    currentUserId.value = null; // Reset current user ID
  };
  
  // Fetch users on mount
  fetchUsers();
  </script>
  