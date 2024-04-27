import instance from "@/lib/axios";

async function PostInviteMember(
  token: any,
  inviteData: { dashboardId: number; email: string }
) {
  try {
    const response = await instance.post(
      `/dashboards/${inviteData.dashboardId}/invitations`,
      {
        email: inviteData.email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}

export { PostInviteMember };
