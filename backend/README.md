Skinuti Intelij IDEA Ultimate edition 2021.2.3 ( https://www.jetbrains.com/idea/download/#section=windows)
Prijaviti se za studentsku licencu pomocu studentskog maila na link https://www.jetbrains.com/shop/eform/students a ima i free trial verzija 90 dana
Napraviti novu semu baze podataka na MySQL Workbench-u i izvrsiti sljedecu skriptu.

CREATE TABLE citizenship
(
    id      INT AUTO_INCREMENT NOT NULL,
    country VARCHAR(45)        NOT NULL,
    CONSTRAINT pk_citizenship PRIMARY KEY (id)
);/8

CREATE TABLE workplace
(
    id   INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(45)        NOT NULL,
    CONSTRAINT pk_workplace PRIMARY KEY (id)
);

CREATE TABLE user
(
    id        INT AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(45)        NOT NULL,
    lastname  VARCHAR(45)        NOT NULL,
    username  VARCHAR(100)       NOT NULL,
    password  VARCHAR(100)       NOT NULL,
    email     VARCHAR(100)       NOT NULL,
    `role`    INT                NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id)
);

CREATE TABLE citizen
(
    id                    INT AUTO_INCREMENT NOT NULL,
    firstname             VARCHAR(45)        NOT NULL,
    lastname              VARCHAR(45)        NOT NULL,
    email                 VARCHAR(100)       NOT NULL,
    phone                 VARCHAR(45)        NOT NULL,
    city                  VARCHAR(45)        NOT NULL,
    company               VARCHAR(45)        NOT NULL,
    year                  VARCHAR(45)        NOT NULL,
    num_of_family_members VARCHAR(255)       NOT NULL,
    workplace_id          INT                NULL,
    citizenship_id        INT                NULL,
    CONSTRAINT pk_citizen PRIMARY KEY (id)
);

INSERT INTO citizenship (country) VALUES("BIH");
INSERT INTO citizenship (country) VALUES("SRB");
INSERT INTO citizenship (country) VALUES("HR");

INSERT INTO workplace (name) VALUES ("Vozac");
INSERT INTO workplace (name) VALUES ("Konobar");
INSERT INTO workplace (name) VALUES ("Gradjevinski radnik");

ALTER TABLE citizen
    ADD CONSTRAINT FK_CITIZEN_ON_CITIZENSHIP FOREIGN KEY (citizenship_id) REFERENCES citizenship (id);

ALTER TABLE citizen
    ADD CONSTRAINT FK_CITIZEN_ON_WORKPLACE FOREIGN KEY (workplace_id) REFERENCES workplace (id);

Nakon pokretanja aplikacija radi na portu 8080 na localhost.
Dostupna su dva endpointa localhost:8080/login i localhost:8080/citizens.

Na login endpointu dozvoljena je POST metoda koja u tijelu poruke treba da posalje parametre username i password. U bazi se automatski generise jedan korisnik u tabeli user
nakon pokretanja aplikacije ciji su kredencijali username admin i password admin. U odgovoru na POST zahtjev ce biti JWT(JSON Web Token) koji je validan 15 minuta. Upiti na endpoint
citizen zahtjevaju autorizaciju pomocu ovog tokena.
primjer tijela POST metoda
{
	"username" : "admin",
	"password" : "admin"
}


Na citizens endpointu dozvoljene su GET i POST metoda. Pri pozivu ovih metoda potrebno je ukljuciti Bearer Token tip autorizacije cija ce vrijednost biti token koji je vracen u POST zahtjevu
na login endopoint.

GET metoda vraca listu gradjana. Potrebno je definisati query parametre page i size koji definisu redni broj i velicinu
stranice pri paginaciji. Default vrijednost za parameter page je 0, dok je za parametar size 10.
primjeri poziva GET metoda
/citizens (ovaj poziv ce vratiti prvih deset zapisa iz baze)
/citizens/?size=5 (ovaj poziv ce vratiti prvih pet zapisa iz baze)
/citizens/?page=1 (ovaj poziv ce vratiti drugih deset zapisa iz baze)
/citizens/?page=2&size=5 (ovaj poziv ce vratiti trecih pet zapisa iz baze)

POST metoda ce kreirati i sacuvati novog gradjana u bazu o kojem su podaci proslijedjeni u tijelu POST zahtjeva.
primjer tijela POST metoda

{
        "firstname": "Marko",
        "lastname": "Markovic",
        "email": "marko.markovic@email.com,
        "phone": "+38766000000",
        "city": "Banja Luka",
        "company": "Company doo",
        "year": "2014",
        "num_of_family_members": "4",
        "workplaceEntity": {
            "id": 1,
            "name": "Developer"
        },
        "citizenshipEntity": {
            "id": 1,
            "country": "BIH"
        }
}
Za pocetak za testiranje koristite samo ove podatke sto su uneseni za drzavljanstvo i radno mjesto i unesene ID-ove ili ubacite sami nove podatke, uglavnom referencijalni
integritet mora biti ispostovan.

