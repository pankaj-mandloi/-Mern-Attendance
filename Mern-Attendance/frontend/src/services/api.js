import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getMe: builder.query({
      query: () => '/auth/me',
    }),
    punchIn: builder.mutation({
      query: (data) => ({
        url: '/attendance/punch-in',
        method: 'POST',
        body: data,
      }),
    }),
    punchOut: builder.mutation({
      query: (data) => ({
        url: '/attendance/punch-out',
        method: 'POST',
        body: data,
      }),
    }),
    getMyAttendance: builder.query({
      query: () => '/attendance/my-attendance',
    }),
    getTeamAttendance: builder.query({
      query: () => '/attendance/team-attendance',
    }),
    getAllAttendance: builder.query({
      query: () => '/attendance/all-attendance',
    }),
    requestOvertime: builder.mutation({
      query: (data) => ({
        url: '/overtime/request',
        method: 'POST',
        body: data,
      }),
    }),
    getMyOvertime: builder.query({
      query: () => '/overtime/my-requests',
    }),
    getPendingOvertime: builder.query({
      query: () => '/overtime/pending',
    }),
    approveOvertime: builder.mutation({
      query: ({ id, remarks }) => ({
        url: `/overtime/approve/${id}`,
        method: 'PUT',
        body: { remarks },
      }),
    }),
    rejectOvertime: builder.mutation({
      query: ({ id, remarks }) => ({
        url: `/overtime/reject/${id}`,
        method: 'PUT',
        body: { remarks },
      }),
    }),
    validateAttendance: builder.mutation({
      query: ({ id, status, remarks }) => ({
        url: `/admin/validate-attendance/${id}`,
        method: 'PUT',
        body: { status, remarks },
      }),
    }),
    getAllUsers: builder.query({
      query: () => '/admin/users',
    }),
    getEmployeeDashboard: builder.query({
      query: () => '/dashboard/employee',
    }),
    getManagerDashboard: builder.query({
      query: () => '/dashboard/manager',
    }),
    getAdminDashboard: builder.query({
      query: () => '/dashboard/admin',
    }),
    getDailyReport: builder.query({
      query: (date) => `/reports/daily?date=${date}`,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  usePunchInMutation,
  usePunchOutMutation,
  useGetMyAttendanceQuery,
  useGetTeamAttendanceQuery,
  useGetAllAttendanceQuery,
  useRequestOvertimeMutation,
  useGetMyOvertimeQuery,
  useGetPendingOvertimeQuery,
  useApproveOvertimeMutation,
  useRejectOvertimeMutation,
  useValidateAttendanceMutation,
  useGetAllUsersQuery,
  useGetEmployeeDashboardQuery,
  useGetManagerDashboardQuery,
  useGetAdminDashboardQuery,
  useGetDailyReportQuery,
} = api;