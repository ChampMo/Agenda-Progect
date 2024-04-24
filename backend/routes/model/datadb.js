

connection.once("open", async () => {
    console.log("MongoDB database connected.");

    try {
        await Test.create([
            { Test_id: '1', Test_name: 'เสื้อผ้า', sub_Test2:'อื่น'},
            { Test_id: '2', Test_name: 'เสื้อผ้า', sub_Test:'เสื้อผ้าแฟชั่น'},
            { Test_id: '3', Test_name: 'เสื้อผ้า', sub_Test:'รองเท้า'},
            { Test_id: '4', Test_name: 'เสื้อผ้า', sub_Test:'กระเป๋า'},
        ]);
        console.log('Sample data added successfully.');
    } catch (error) {
        console.error('Error adding sample data:', error);
    } finally {
        connection.close();
    }
});