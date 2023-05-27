export const getApiResource = async (url: string) => {
    try { 
        const res = await fetch(url); 

        if(!res.ok){
            console.error('Could not fetch.', res.status);
            return false;
        };

        return await res.json();
    } catch (err: any) {
        console.log('Could not fetch.', err.message);
        return false;
    }
};

export const postApiResource = async (url: string, data: {}) => {
    try { 
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(data)
        }); 

        if(!res.ok){
            console.error('Could not fetch.', res.status);
            return false;
        };

        return await res.json();
    } catch (err: any) {
        console.log('Could not fetch.', err.message);
        return false;
    }
};

export const deleteApiResource = async (url: string) => {
    try { 
        const res = await fetch(url, {
            method: "DELETE"
        }); 

        if(!res.ok){
            console.error('Could not fetch.', res.status);
            return false;
        };

        return await res.json();
    } catch (err: any) {
        console.log('Could not fetch.', err.message);
        return false;
    }
};