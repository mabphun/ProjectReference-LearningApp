# Kliensoldali fejlesztés
### 1. A fejlesztés célja: 
A fejlesztés célja egy új, könnyen használható tanuló program létrehozása, melyben szavak, kifejezések jelentését, ábrák felismerését gyakorolhatják a felhasználók. 

### 2. A program működése:
Autentikáció után egyből a nemrég játszott Set-ek listája elé kerül a felhasználó, ezzel is segítve a produktivitást. Ha még nincs nem rendelkezik ilyennek a felhasználó, akkor létrehozhat új Set-eket és keresgélhet a más felhasználók által létrehozottak között. Létrehozás során beállíthatjuk a Set nevét, leírását, melyeket később tudunk szerkeszteni, és hozzáférhetőségét, ez lehet privát, vagy publikus ami megjelenik a többi felhasználó számára is a Browse tabon. Ezután a kártyák hozzáadása következik, ahol meg kell adnunk kérdést, választ, és társíthatjuk egy kép linkjét is. Létrehozás után elindíthatjuk a játékot. Ilyenkor megjelenik a kérdés, ha csatoltunk képet akkor a képpel együtt, majd erre beírhatjuk a választ. Adott Set-en belüli helyes válaszok számát elmenti a rendszer, ezeket statisztikaként láthatjuk majd.

### 3. Program specifikáció:

#### Linkek:
- [Figma Design](https://www.figma.com/file/cZ612eUbb3YZabhil76ebX/KF_FF_Design?node-id=0%3A1&t=hWCvWnOA2SYLi0su-1)

#### Felhasznált technológiák:
- Angular
- Bootstrap 5

#### Funkciólista:
- Felhasználó:
    - Regisztráció
    - Bejelentkezés
    - Játék statisztikák
- Set:
    - Létrehozás
    - Szerkesztés
        - Név, leírás, kártyák tartalma
    - Törlés
    - Játék
- Kártya:
    - Kérdés, válasz szerkesztés
    - Kép társítás

#### Végpontlista:
- Card
    - GetCards, GetCard, CreateCard, DeleteCard, UpdateCard
- LearningSet
    - GetLearningSets, GetLearningSet, CreateLearningSet, DeleteLearningSet, UpdateLearningSet
- AppUser
    - GetAppUsers, GetAppUser, CreateAppUser, DeleteAppUser, UpdateAppUser
- PlayModel
    - GetPlayModels, GetPlayModel, CreatePlayModel, DeletePlayModel, UpdatePlayModel, Statistics

#### Modellek tulajdonságai:
| Felhasználó |
| - |
| Azonosító (szöveg) |
| Név (szöveg) |
| Kép (szöveg) |

| Kérdéssor | 
| - |
| Azonosító (szöveg) |
| Név (szöveg) |
| Leírás (szöveg) |
| Privát? (logikai) |

| Kérdés |
| - |
| Azonosító (szöveg) |
| Kérdés (szöveg) |
| Válasz (szöveg) |
| Kép (szöveg) |

| Játék Modell |
| - |
| Azonosító (szöveg) |
| Játszott mennyiség (szám) |
| Befejezett mennyiség (szám) |
| Legtöbb helyes válasz (szám) |

#### Látványtervek:
![home](https://user-images.githubusercontent.com/33196966/235307395-a3edf861-304e-4d31-ac0f-48db8259b0f7.png)
![ownsets](https://user-images.githubusercontent.com/33196966/235307452-3a1bcdbc-00c9-4a2b-b96d-924f16368417.png)
![browse](https://user-images.githubusercontent.com/33196966/235307498-dc59c22c-17d7-45bb-b0ab-da3b1eeb96cb.png)
![createset](https://user-images.githubusercontent.com/33196966/235307520-eff3bed8-5e5d-4678-8c56-6c4ba1d5324b.png)
![editset](https://user-images.githubusercontent.com/33196966/235307546-3824bae3-dca0-4261-9b14-078479a239b3.png)
![profile](https://user-images.githubusercontent.com/33196966/235307587-b0ae4228-0cf0-455a-8435-d1e43a2ab5e0.png)
![play](https://user-images.githubusercontent.com/33196966/235307603-6eb52d93-b2e5-49fa-b96f-f1743898225e.png)
