import IUser from "../../../types/user.type.ts";

export default function UserTable({allUsers}) {
    const users:IUser[] = allUsers;
    return (
        <>
            <div className="col-start-2 col-span-3">
                <div>
                    <table className="table drivers-table">
                        <caption><h3>Users -
                            <small>({users?.length} total)</small></h3>
                        </caption>
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Team Name</th>
                            <th>Email</th>
                            <th>Last Logout</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users?.map((user: IUser) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td>{user.team?.teamName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.lastLogout}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}