export const columns = [
    {
        title: 'Ime i prezime',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <p> {record.firstname} {record.lastname}</p>,

    },
    {
        title: 'Godina rođenja',
        dataIndex: 'year_of_birth',
        key: 'year_of_birth',
        width: 15,
    },
    {
        title: 'Grad',
        dataIndex: 'city',
        key: 'city',
        width:25,
    },
    {
        title: 'Strucna sprema',
        dataIndex: 'education',
        key: 'education',
    },

    {
        title: 'Kompanija',
        dataIndex: 'company',
        key: 'company',
        width: 20,
    },
    {
        title: 'Drzavljanstvo',
        dataIndex: ['citizenshipEntity', 'country'],
        key: 'country',
        width: 10,
        filters: [
            {
                text: 'BiH',
                value: 'BiH'
            },
            {
                text: 'Srbija',
                value: 'Srbija'
            },
            {
                text:'Hrvatska',
                value:'Hrvatska'
            },
            {
                text: 'Crna Gora',
                value: 'Crna Gora'
            },
            {
                text:'Makedonija',
                value:'Makedonija'
            }
        ],
        filterMultiple: false
    },
    {
        title: 'Godina dolaska ',
        dataIndex: 'year_of_arrival',
        key: 'year_of_arrival',
        width: 15,
    },
    {
        title: 'Pol',
        dataIndex: 'gender',
        key:'gender',
        width: 15,
        filters: [
            {
                text: 'ženski',
                value: 'zenski'
            },
            {
                text: 'muški',
                value: 'muski'
            }
        ],
        filterMultiple: false
    },
    {
        title: 'Info'
    }
    /*{
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        className: "email-column"
        // render: (text) => <p className={"email-column"}>{text}</p>,
    },
    {
        title: 'Telefon',
        dataIndex: 'phone',
        key: 'phone',
        width: 20,
    },
    {
        title: 'Radno mjesto',
        dataIndex: 'workplace',
        key: 'workplace',
    },
    {
        title: 'Broj clanova domacinstva',
        dataIndex: 'num_of_family_members',
        key: 'num_of_family_members',
        // width: 15,
    }*/


];