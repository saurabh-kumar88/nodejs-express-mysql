/***
 * 1. validate tutorial object, allow only valid sql columns names
 * 2. based on what key is present, creat query string dynamically
 */
const tutorial = {
    title: "foo"
}

const id = 3


function buildSqlUpdateQuery(inputObject, id){
    /**
     * Build sql build query on runtime based on info which needs to be updated
     */

    // check what keys are present
    const sqlColumns = ['title', 'description', 'published']
    let subQuery = ''
    for (const key in inputObject) {
        if (Object.hasOwnProperty.call(inputObject, key) && sqlColumns.includes(key)) {
            if(key==='published'){
                subQuery += `${key}=${inputObject[key]},`
            }else{
                subQuery += `${key}='${inputObject[key]}',`
            }        
        }
    }
    console.log(subQuery.slice(0, -1))
    return `UPDATE FROM tutorials SET ${subQuery.slice(0, -1)} WHERE id=${id};`
};

console.log(buildSqlUpdateQuery(tutorial, 3))

// if(sqlColumns.includes('title')){
//     console.log("present!")
// }

let query = `UPDATE tutorials SET title='${tutorial.title}', description='${tutorial.description}', published=${tutorial.published} WHERE id=${id};`

/*

git config --global user.email "ykings.saurabh@gmail.com"
git config --global user.name "saurabh"
/


