// let token = `12345test`
let token = localStorage.getItem('token')

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://evanescent-western-apple.glitch.me//api/carbons/${token}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }); 
        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        console.log(data)
        const response = await fetch(`https://evanescent-western-apple.glitch.me//api/carbons`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (token: string, id:string, data:any = {}) => {
        console.log(data)
        const response = await fetch(`https://evanescent-western-apple.glitch.me//api/carbons/${token}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string) => {
        const response = await fetch(`https://evanescent-western-apple.glitch.me//api/carbons/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}