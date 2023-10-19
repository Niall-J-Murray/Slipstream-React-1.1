const ToDoItem = (props: any) => {
    const {user} = props;
    const {userId, username, email} = user;
    return (
        <>
            <ul>
                <li>{userId + ", "}
                    {username + ", "}
                    {email}</li>
            </ul>
        </>

    )
}
export default ToDoItem;
