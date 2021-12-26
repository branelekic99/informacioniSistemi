export const columns = [
    {
        title: 'Ime i prezime',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <p> {record.firstname} {record.lastname}</p>,
        align:"center",
    },
    {
        title: 'Godina rođenja',
        dataIndex: 'year_of_birth',
        key: 'year_of_birth',
        width: 15,
        align:"center",
    },
    {
        title: 'Grad',
        dataIndex: 'city',
        key: 'city',
        align:"center",
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        className: "email-column",
        // render: (text) => <p className={"email-column"}>{text}</p>,
        align:"center",
    },
    {
        title: 'Telefon',
        dataIndex: 'phone',
        key: 'phone',
        width: 20,
        align:"center",
    },
    {
        title: 'Strucna sprema',
        dataIndex: 'education',
        key: 'education',
        align:"center",
    },
    {
        title: 'Radno mjesto',
        dataIndex: 'workplace',
        key: 'workplace',
        align:"center",
    },
    {
        title: 'Kompanija',
        dataIndex: 'company',
        key: 'company',
        align:"center",
    },
    {
        title: 'Drzavljanstvo',
        dataIndex: ['citizenshipEntity', 'country'],
        key: 'country',
        width: 20,
        align:"center",
    },
    {
        title: 'Godina dolaska ',
        dataIndex: 'year_of_arrival',
        key: 'year_of_arrival',
        width: 15,
        align:"center",
    },
    {
        title: 'Broj clanova domacinstva',
        dataIndex: 'num_of_family_members',
        key: 'num_of_family_members',
        align:"center",
        className:"num-of-family-members"
    }
];