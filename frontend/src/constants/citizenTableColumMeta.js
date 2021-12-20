export const columns = [
    {
        title: 'Ime i prezime',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <p> {record.firstname} {record.lastname}</p>,
    },
    {
        title: 'Godine starosti',
        dataIndex: 'year_of_birth',
        key: 'year_of_birth',
        width: 15,
    },
    {
        title: 'Grad',
        dataIndex: 'city',
        key: 'city',
    },
    {
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
        title: 'Strucna sprema',
        dataIndex: 'education',
        key: 'education',
    },
    {
        title: 'Radno mjesto',
        dataIndex: 'workplace',
        key: 'workplace',
    },
    {
        title: 'Kompanija',
        dataIndex: 'company',
        key: 'company',
    },
    {
        title: 'Drzavljanstvo',
        dataIndex: ['citizenshipEntity', 'country'],
        key: 'country',
        width: 20,
    },
    {
        title: 'Godina dolaska ',
        dataIndex: 'year_of_arrival',
        key: 'year_of_arrival',
        width: 15,
    },

    {
        title: 'Broj clanova domacinstva',
        dataIndex: 'num_of_family_members',
        key: 'num_of_family_members',
        // width: 15,
    }
];