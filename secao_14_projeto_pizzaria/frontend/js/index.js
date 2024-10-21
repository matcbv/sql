const delAccountBtn = document.querySelector('.del-account');

if(delAccountBtn){
    delAccountBtn.addEventListener('click', () => {
        const dataList = []
        const dataDiv = delAccountBtn.previousElementSibling.querySelectorAll('p')
        for (p of dataDiv){
            dataList.push(p.innerHTML);
        }
        fetch('/delAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataList)
        })
    })
}
