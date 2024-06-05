
const url = 'https://jsonplaceholder.typicode.com/posts/'

// fetch(url)
//     .then((res) => res.json())
//     .then((data) => console.log(data))
//     .catch(e => console.log(e))
//     .finally(() =>console.log("finalizó"))

const findPostById = async (id) => {
    try{
        const res = await fetch(url + id);
        const post = await res.json();

        console.log(post);
    } catch (error) {
        console.log(error);
    }
};

findPostById(50);

