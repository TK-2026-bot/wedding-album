export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ca", label: "Català" },
  { code: "es", label: "Español" },
  { code: "ru", label: "Русский" },
];

const LANG_KEY = "lang";

const STRINGS = {
  "nav.home": { en: "Home", ca: "Inici", es: "Inicio", ru: "Главная" },
  "nav.albums": { en: "Albums", ca: "Àlbums", es: "Álbumes", ru: "Альбомы" },
  "nav.search": { en: "Search", ca: "Cerca", es: "Buscar", ru: "Поиск" },
  "nav.profile": { en: "Profile", ca: "Perfil", es: "Perfil", ru: "Профиль" },

  "common.cancel": { en: "Cancel", ca: "Cancel·la", es: "Cancelar", ru: "Отмена" },
  "common.loading": { en: "Loading…", ca: "Carregant…", es: "Cargando…", ru: "Загрузка…" },
  "common.save": { en: "Save", ca: "Desa", es: "Guardar", ru: "Сохранить" },
  "common.share": { en: "Share", ca: "Comparteix", es: "Compartir", ru: "Поделиться" },
  "common.move": { en: "Move", ca: "Mou", es: "Mover", ru: "Переместить" },
  "common.moveTo": { en: "Move to…", ca: "Mou a…", es: "Mover a…", ru: "Переместить в…" },
  "common.delete": { en: "Delete", ca: "Elimina", es: "Eliminar", ru: "Удалить" },

  "index.empty": {
    en: "No albums yet — go to Albums to create the first one.",
    ca: "Encara no hi ha àlbums — ves a Àlbums per crear el primer.",
    es: "Todavía no hay álbumes — ve a Álbumes para crear el primero.",
    ru: "Пока нет альбомов — перейдите в «Альбомы», чтобы создать первый.",
  },
  "index.emptyPinned": {
    en: "No pinned albums yet — see all albums in the Albums tab.",
    ca: "Encara no hi ha àlbums fixats — mira tots els àlbums a la pestanya Àlbums.",
    es: "Todavía no hay álbumes fijados — mira todos los álbumes en la pestaña Álbumes.",
    ru: "Пока нет закреплённых альбомов — все альбомы во вкладке «Альбомы».",
  },

  "albums.title": { en: "Albums", ca: "Àlbums", es: "Álbumes", ru: "Альбомы" },
  "albums.new": { en: "+ New", ca: "+ Nou", es: "+ Nuevo", ru: "+ Новый" },
  "albums.empty": {
    en: "No albums yet — create the first one.",
    ca: "Encara no hi ha àlbums — crea'n el primer.",
    es: "Todavía no hay álbumes — crea el primero.",
    ru: "Пока нет альбомов — создайте первый.",
  },

  "album.emptyPhotos": {
    en: "No photos yet — tap the + button to add the first one.",
    ca: "Encara no hi ha fotos — toca el botó + per afegir-ne la primera.",
    es: "Todavía no hay fotos — toca el botón + para añadir la primera.",
    ru: "Пока нет фото — нажмите «+», чтобы добавить первое.",
  },
  "album.recentlyAddedBy": { en: "Recently added by", ca: "Afegit recentment per", es: "Añadido recientemente por", ru: "Недавно добавили" },
  "album.sheetTitle": { en: "Add photos", ca: "Afegeix fotos", es: "Añadir fotos", ru: "Добавить фото" },
  "album.takePhoto": { en: "Take Photo or Video", ca: "Fes una foto o vídeo", es: "Tomar foto o vídeo", ru: "Снять фото или видео" },
  "album.chooseGallery": { en: "Choose from Gallery", ca: "Tria de la galeria", es: "Elegir de la galería", ru: "Выбрать из галереи" },
  "album.uploading": { en: "Uploading", ca: "Pujant", es: "Subiendo", ru: "Загрузка" },
  "album.compressing": { en: "Compressing…", ca: "Comprimint…", es: "Comprimiendo…", ru: "Сжатие…" },
  "album.rename": { en: "Rename", ca: "Canvia el nom", es: "Renombrar", ru: "Переименовать" },
  "album.renamePrompt": { en: "Album name", ca: "Nom de l'àlbum", es: "Nombre del álbum", ru: "Название альбома" },
  "album.pin": { en: "Pin to Home", ca: "Fixa a l'inici", es: "Fijar en Inicio", ru: "Закрепить на главной" },
  "album.unpin": { en: "Unpin from Home", ca: "Desfixa de l'inici", es: "Desfijar de Inicio", ru: "Открепить с главной" },
  "album.deleteAlbum": { en: "Delete Album", ca: "Elimina l'àlbum", es: "Eliminar álbum", ru: "Удалить альбом" },
  "album.setCover": { en: "Set Cover", ca: "Posa com a portada", es: "Fijar portada", ru: "Сделать обложкой" },
  "album.coverSet": { en: "Cover updated", ca: "Portada actualitzada", es: "Portada actualizada", ru: "Обложка обновлена" },
  "album.confirmDeleteAlbum": {
    en: "Delete this album and everything in it? This cannot be undone.",
    ca: "Vols eliminar aquest àlbum i tot el contingut? No es pot desfer.",
    es: "¿Eliminar este álbum y todo su contenido? No se puede deshacer.",
    ru: "Удалить альбом и всё его содержимое? Действие необратимо.",
  },
  "album.uploadDone": { en: "Done", ca: "Fet", es: "Listo", ru: "Готово" },
  "album.uploadFailed": { en: "Failed", ca: "Ha fallat", es: "Error", ru: "Ошибка" },

  "login.subtitle": {
    en: "Enter your name and the access code from your invitation",
    ca: "Introdueix el teu nom i el codi d'accés de la teva invitació",
    es: "Introduce tu nombre y el código de acceso de tu invitación",
    ru: "Введите имя и код доступа из приглашения",
  },
  "login.nameLabel": { en: "Your name", ca: "El teu nom", es: "Tu nombre", ru: "Ваше имя" },
  "login.codeLabel": { en: "Access code", ca: "Codi d'accés", es: "Código de acceso", ru: "Код доступа" },
  "login.continue": { en: "Continue", ca: "Continua", es: "Continuar", ru: "Продолжить" },
  "login.signingIn": { en: "Signing in…", ca: "Iniciant sessió…", es: "Iniciando sesión…", ru: "Выполняется вход…" },
  "login.errNoName": { en: "Enter your name", ca: "Escriu el teu nom", es: "Escribe tu nombre", ru: "Введите имя" },
  "login.errNoEvent": {
    en: "Event not found. Check the Firebase configuration.",
    ca: "No s'ha trobat l'esdeveniment. Revisa la configuració de Firebase.",
    es: "No se encontró el evento. Revisa la configuración de Firebase.",
    ru: "Событие не найдено. Проверьте настройки Firebase.",
  },
  "login.errBadCode": { en: "Incorrect access code", ca: "Codi d'accés incorrecte", es: "Código de acceso incorrecto", ru: "Неверный код доступа" },
  "login.errGeneric": {
    en: "Something went wrong. Try again.",
    ca: "Alguna cosa ha fallat. Torna-ho a provar.",
    es: "Algo salió mal. Inténtalo de nuevo.",
    ru: "Что-то пошло не так. Попробуйте ещё раз.",
  },

  "newAlbum.title": { en: "New Album", ca: "Àlbum nou", es: "Álbum nuevo", ru: "Новый альбом" },
  "newAlbum.nameLabel": { en: "Album Name", ca: "Nom de l'àlbum", es: "Nombre del álbum", ru: "Название альбома" },
  "newAlbum.namePlaceholder": { en: "e.g. Beach Party", ca: "p. ex. Festa a la platja", es: "p. ej. Fiesta en la playa", ru: "например, Вечеринка на пляже" },
  "newAlbum.coverLabel": { en: "Cover Photo", ca: "Foto de portada", es: "Foto de portada", ru: "Обложка" },
  "newAlbum.auto": { en: "Auto", ca: "Auto", es: "Auto", ru: "Авто" },
  "newAlbum.autoSub": { en: "First photo added", ca: "Primera foto afegida", es: "Primera foto añadida", ru: "Первое добавленное фото" },
  "newAlbum.choose": { en: "Choose", ca: "Tria", es: "Elegir", ru: "Выбрать" },
  "newAlbum.chooseSub": { en: "Pick a photo now", ca: "Tria una foto ara", es: "Elige una foto ahora", ru: "Выбрать фото сейчас" },
  "newAlbum.create": { en: "Create Album", ca: "Crea l'àlbum", es: "Crear álbum", ru: "Создать альбом" },
  "newAlbum.creating": { en: "Creating…", ca: "Creant…", es: "Creando…", ru: "Создание…" },
  "newAlbum.errNoName": { en: "Give the album a name", ca: "Posa un nom a l'àlbum", es: "Ponle un nombre al álbum", ru: "Введите название альбома" },
  "newAlbum.errCreate": { en: "Could not create the album", ca: "No s'ha pogut crear l'àlbum", es: "No se pudo crear el álbum", ru: "Не удалось создать альбом" },

  "profile.title": { en: "Profile", ca: "Perfil", es: "Perfil", ru: "Профиль" },
  "profile.language": { en: "Language", ca: "Idioma", es: "Idioma", ru: "Язык" },
  "profile.invite": { en: "Invite links", ca: "Enllaços d'invitació", es: "Enlaces de invitación", ru: "Пригласительные ссылки" },
  "profile.copy": { en: "Copy", ca: "Copia", es: "Copiar", ru: "Копировать" },
  "profile.members": { en: "Manage members", ca: "Gestiona els membres", es: "Administrar miembros", ru: "Управление участниками" },
  "profile.logout": { en: "Log out", ca: "Tanca la sessió", es: "Cerrar sesión", ru: "Выйти" },
  "profile.linkCopied": {
    en: "Link copied — share it with your guests",
    ca: "Enllaç copiat — comparteix-lo amb els teus convidats",
    es: "Enlace copiado — compártelo con tus invitados",
    ru: "Ссылка скопирована — поделитесь ею с гостями",
  },
  "profile.chooseLanguage": { en: "Choose language", ca: "Tria l'idioma", es: "Elige el idioma", ru: "Выберите язык" },
  "profile.roleAdmin": { en: "ADMINISTRATOR", ca: "ADMINISTRADOR/A", es: "ADMINISTRADOR/A", ru: "АДМИНИСТРАТОР" },
  "profile.roleParticipant": { en: "PARTICIPANT", ca: "PARTICIPANT", es: "PARTICIPANTE", ru: "УЧАСТНИК" },
  "profile.roleViewer": { en: "VIEWER", ca: "ESPECTADOR/A", es: "ESPECTADOR/A", ru: "ЗРИТЕЛЬ" },
  "profile.accessCodes": { en: "Access codes", ca: "Codis d'accés", es: "Códigos de acceso", ru: "Коды доступа" },
  "profile.codeAdmin": { en: "Administrator", ca: "Administrador/a", es: "Administrador/a", ru: "Администратор" },
  "profile.codeParticipant": { en: "Participant", ca: "Participant", es: "Participante", ru: "Участник" },
  "profile.codeViewer": { en: "Viewer", ca: "Espectador/a", es: "Espectador/a", ru: "Зритель" },
  "profile.codeNotSet": { en: "not set", ca: "no establert", es: "no establecido", ru: "не задан" },
  "profile.codeCopied": { en: "Code copied", ca: "Codi copiat", es: "Código copiado", ru: "Код скопирован" },
  "profile.sectionPreferences": { en: "PREFERENCES", ca: "PREFERÈNCIES", es: "PREFERENCIAS", ru: "НАСТРОЙКИ" },
  "profile.sectionAdminTools": { en: "ADMIN TOOLS", ca: "EINES D'ADMINISTRACIÓ", es: "HERRAMIENTAS DE ADMIN", ru: "ИНСТРУМЕНТЫ АДМИНА" },
  "profile.sectionAccount": { en: "ACCOUNT", ca: "COMPTE", es: "CUENTA", ru: "АККАУНТ" },

  "viewer.moveTitle": { en: "Move to…", ca: "Mou a…", es: "Mover a…", ru: "Переместить в…" },
  "viewer.confirmDelete": {
    en: "Delete this item? This cannot be undone.",
    ca: "Vols eliminar aquest element? No es pot desfer.",
    es: "¿Eliminar este elemento? No se puede deshacer.",
    ru: "Удалить этот элемент? Действие необратимо.",
  },
  "viewer.linkCopied": { en: "Link copied to clipboard", ca: "Enllaç copiat al porta-retalls", es: "Enlace copiado al portapapeles", ru: "Ссылка скопирована в буфер обмена" },
  "viewer.noOtherAlbums": {
    en: "No other albums to move to yet",
    ca: "Encara no hi ha altres àlbums on moure",
    es: "Todavía no hay otros álbumes a los que mover",
    ru: "Пока нет других альбомов для перемещения",
  },

  "multiselect.title": { en: "Select", ca: "Selecciona", es: "Seleccionar", ru: "Выбор" },
  "multiselect.selectAll": { en: "Select all", ca: "Selecciona-ho tot", es: "Seleccionar todo", ru: "Выбрать все" },
  "multiselect.confirmDelete": {
    en: "Delete {n}? This cannot be undone.",
    ca: "Vols eliminar {n}? No es pot desfer.",
    es: "¿Eliminar {n}? No se puede deshacer.",
    ru: "Удалить: {n}? Действие необратимо.",
  },
  "multiselect.empty": {
    en: "No photos in this album yet.",
    ca: "Encara no hi ha fotos en aquest àlbum.",
    es: "Todavía no hay fotos en este álbum.",
    ru: "В этом альбоме пока нет фото.",
  },
};

const UNITS = {
  photo: {
    en: (n) => (n === 1 ? "photo" : "photos"),
    ca: (n) => (n === 1 ? "foto" : "fotos"),
    es: (n) => (n === 1 ? "foto" : "fotos"),
    ru: () => "фото",
  },
  video: {
    en: (n) => (n === 1 ? "video" : "videos"),
    ca: (n) => (n === 1 ? "vídeo" : "vídeos"),
    es: (n) => (n === 1 ? "vídeo" : "vídeos"),
    ru: () => "видео",
  },
  item: {
    en: (n) => (n === 1 ? "item" : "items"),
    ca: (n) => (n === 1 ? "element" : "elements"),
    es: (n) => (n === 1 ? "elemento" : "elementos"),
    ru: (n) => ruPlural(n, ["элемент", "элемента", "элементов"]),
  },
  selected: {
    en: () => "selected",
    ca: (n) => (n === 1 ? "seleccionat" : "seleccionats"),
    es: (n) => (n === 1 ? "seleccionado" : "seleccionados"),
    ru: () => "выбрано",
  },
};

function ruPlural(n, [one, few, many]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}

export function getLang() {
  const saved = localStorage.getItem(LANG_KEY);
  return LANGUAGES.some((l) => l.code === saved) ? saved : "en";
}

export function setLang(code) {
  localStorage.setItem(LANG_KEY, code);
  applyTranslations();
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: code } }));
}

export function t(key) {
  const lang = getLang();
  const entry = STRINGS[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

// Builds a "{n} unit" string with correct pluralization for the current language.
export function count(n, unitKey) {
  const lang = getLang();
  const fn = UNITS[unitKey]?.[lang] || UNITS[unitKey]?.en;
  return `${n} ${fn ? fn(n) : unitKey}`;
}

export function applyTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });
}
