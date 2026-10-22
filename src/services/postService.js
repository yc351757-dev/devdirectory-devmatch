import apiClient from './api.js';
import { developerDetails } from '../data/developers.js';

const fallbackPosts = [
  { id: 101, userId: 1, title: 'Designing a student-first campus dashboard', body: 'A short case study on building a responsive interface with accessible components and clear navigation.' },
  { id: 102, userId: 1, title: 'Small UI details that improve usability', body: 'Notes on empty states, loading feedback, keyboard navigation and consistent design tokens.' },
  { id: 201, userId: 2, title: 'Keeping API routes predictable', body: 'A practical approach to clear endpoint naming, reliable validation and useful error responses.' },
  { id: 301, userId: 3, title: 'Making student data easier to understand', body: 'A dashboard concept that turns attendance and marks into simple charts and actionable insights.' }
];

export async function getDevelopers() {
  try {
    const { data } = await apiClient.get('/users');
    return data.map((user) => {
      const custom = developerDetails.find((item) => item.id === user.id) || developerDetails[(user.id - 1) % developerDetails.length];
      return { ...user, ...custom, id: user.id };
    });
  } catch (error) {
    console.warn('Using local demo developer data because the remote API is unavailable.', error?.message);
    return developerDetails;
  }
}

export async function getDeveloper(id) {
  try {
    const { data } = await apiClient.get(`/users/${id}`);
    const custom = developerDetails.find((item) => item.id === Number(id));
    return custom ? { ...data, ...custom, id: data.id } : { ...data, ...developerDetails[0], id: data.id, name: data.name, email: data.email };
  } catch (error) {
    const fallback = developerDetails.find((item) => item.id === Number(id));
    if (fallback) return fallback;
    throw error;
  }
}

export async function getPostsByDeveloper(id) {
  try {
    const { data } = await apiClient.get('/posts', { params: { userId: id } });
    if (data?.length) return data.slice(0, 3);
    return fallbackPosts.filter((post) => post.userId === Number(id));
  } catch (error) {
    const local = fallbackPosts.filter((post) => post.userId === Number(id));
    if (local.length) return local;
    return [{ id: `local-${id}`, userId: Number(id), title: 'Project notes and learning log', body: 'This developer has not published a demo post yet. Add a post to share project learnings with the community.' }];
  }
}

export async function createPost(payload) {
  const { data, status } = await apiClient.post('/posts', payload);
  return { data, status };
}
