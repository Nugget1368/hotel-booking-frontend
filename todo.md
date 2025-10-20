# :star: Nice To Have

- [x] Validering med JWT inloggning
- [x] Logga ut knapp - Töm sessionStorage

# :hammer: Needs Fixing

- [x] Just nu skapas en användare i backend varje gång en bokning ska göras. **Problem**: Om en användares mail-address redan existerar så kan inte en ny användare skapas.
    - [x] **Lösning**: Se till att kolla om användaren redan finns registerad i databasen. Se *:star: Se till ifall användare finns - Create-or-find-user*
    - [x] Om användaren redan finns, använd den befintliga användaren istället.
- [x] När en *guest* tas bort så ska även dess *reservation* göra det.
- [x] En inloggad användare ska kunna se sina *reservations*.
- [x] En inloggad användare ska **enkelt** kunna göra en ny *reservation*.
- [ ] En användare som tidigare gjort en *reservation* ska kunna skapa ett **konto i efterhand**.
- [ ] :exclamation:**Fyll i rapporten**.

# :red_circle: Felhantering

- [x] **Inputfältet för Telefonnumer** Måste komma in som **string** och inte som number, det blir **null i databasen** (Kanske redan är fixat)

# :star: Se till ifall användare finns - Create-or-find-user

I DAO vill vi skapa en metod: CreateOrFindUser, som först kollar ifall användaren redan existerar baserat på **email** och därefter skapar en ny användare ifall att användaren inte finns.

En **ny idé** är att skapa en service-metod som både skapar/hittar användare **och** gör en ny reservation i samma svep. Detta för att dels inte returnera **guestId** till frontend **och** minska mängden anrop från klient till server.