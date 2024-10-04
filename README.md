# LearningApp
Az alkalmazás egy könnyen használható tanuló program, melyben szavak, kifejezések jelentését, ábrák felismerését gyakorolhatják a felhasználók.  

## Projekt megvalósításának folyamatai  
A feladatok követése GitHub Projects-en belül kanban táblán keresztül történt. A fejlesztést verziókezeléssel, feature alapú branch kezeléssel végeztem.

## Beüzemelési útmutató
Az alkalmazás futtatásához szükséges szoftverek:
- **Visual Studio** (backend alkalmazás futtatása)
- **Visual Studio Code** (frontend alkalmazás futtatása)

Az alkalmazás futtatásához szükséges eszközök:
- **node** (v18.10 vagy újabb)
- **Angular** (v15)
- **Angular CLI** (v15)
- **.NET 6**  

Az alkalmazás indítása:
- **Backend**
  - Navigálás a `/KF-QPMPVG-2022-2023-2-BPROF` mappába és az ott található Solution megnyitása
  - `update-database` parancs futtatása a Package Manager Console-ban
  - Alkalmazás indítása az `F5` vagy a `Ctrl+F5` billentyűkombinációval
- **Frontend**
  - Navigálás a `KF-QPMPVG-2022-2023-2-BPROF/AngularProject/learning-app` mappába a `cd <útvonal>` paranccsal
  - `npm install` parancs futtatása
  - `ng serve` parancs futtatása

Sikeres indítás után az alkalmazás felületei a következő elérési utakon érhető el:
- **Backend:** `http://localhost:5127/swagger/` [(Link)](http://localhost:5152/swagger/)
- **Frontend:** `http://localhost:4200/` [(Link)](http://localhost:4200/)

## Hivatkozások
Az eredeti `README` itt érhető el: [README-Original](README-Original.md)  