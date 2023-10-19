export default function Admin(props: any) {
    const {users} = props;
    // const {userId, ...rest} = users;
    // const getValue = (key: any) => {
    //     const {[key]: returnValue} = rest;
    //     return returnValue;
    // }
    // console.log(getValue(users))
    return (
        <>
            <div>Admin</div>
            <ul>
                {users.map((user: any) => {
                    return (
                        <li key={userId}>
                            {user.username}
                        </li>
                    )
                })}
                {/*<li>*/}
                {/*    {getValue(userId)}*/}
                {/*</li>*/}
            </ul>
        </>
    );
}