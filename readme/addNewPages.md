### 1. `src/configs/utils.ts`

-   add new page config to `menuList`
-   be aware the `menuList` is defined as a tuple by using `as const`

### 2. `src/configs/utils.ts`

-   add new page access values to `roleOptions` if this page's basic access is not `0`
-   add new page router path to `routerPaths`

### 3. `src/configs/atoms/atStaff.ts`

-   add new page access values to `initStaff`

### 4. `src/configs/schema/staffSchema.ts`

-   add new page access values to `staffSchema`

### 5. `src/utils/i18n/scriptEn.ts`

-   add new menu text script to `menu`

### 6. `src/App.tsx`

-   add new page router

### 7. `src/routerAccFns/actions/staffAction.ts`

-   add new page access option to the staff api

### 8. backend

-   need to modify api `m_levelCheck` add new page access 
