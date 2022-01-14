const modal = {
    Open(){
        document
        .querySelector('.modal-overlay')
        .classList
        .add('active')
    },

    Close(){
        document
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    }
]

const transactionType = {
    all: transactions,

    Incomes() {
        let income = 0;
        transactionType.all.forEach( transaction => {
            if(transaction.amount > 0 ) {
                income += transaction.amount;
            }
        })

        return income
    },

    Expenses() {
        let expense = 0;
        transactionType.all.forEach( transaction => {
            if(transaction.amount < 0 ) {
                expense += transaction.amount;
            }
        })

        return expense
    },

    Total() {
        return transactionType.Incomes() + transactionType.Expenses()
    }
}

const dom = {

    transactionContainer: document.querySelector('#tabela-transacoes'),

    AddTransaction(transactions, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = dom.InnerHTMLTransaction(transactions)
        dom.transactionContainer.appendChild(tr)
    },

    InnerHTMLTransaction(transactions) {
        const cssClass = transactions.amount > 0 ? "income" : "expense"
        const amount = utils.FormatCurrency(transactions.amount)
        const html = `
        <td class="descricao">${transactions.description}</td>
        <td class=${cssClass}>${amount}</td class="data">
        <td class="data">${transactions.date}</td>
        <td>
            <img src="/assets/minus.svg" alt="Remover transação">
        </td>
        ` 

        return html
    },

    UpdateBalance() {
        document
        .getElementById('income-display')
        .innerHTML = utils.FormatCurrency(transactionType.Incomes()) 

        document
        .getElementById('expense-display')
        .innerHTML = utils.FormatCurrency(transactionType.Expenses())

        document.getElementById('total-display')
        .innerHTML = utils.FormatCurrency(transactionType.Total())
    }
}

const utils =  {
    FormatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

transactions.forEach( 
    function(transactions) {
        dom.AddTransaction(transactions)
    }
)

dom.UpdateBalance()

