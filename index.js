const URL = "https://ca1cee33-bafc-422e-b286-7bf52f206284-00-2c9r22u7xggi0.riker.replit.dev"

const getList = async () => {
    const list = await fetch(`${URL}/list/`).then(data => data.json());
    console.log(list)
}

getList();