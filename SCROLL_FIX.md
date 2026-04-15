# Фикс плавного скролла в Telegram in-app browser (iOS WKWebView)

## Симптом

Сайт дёргается при скролле вверх-вниз на мобильном (iPhone) когда открывается из Telegram.
В Safari браузере — плавно. Только в Telegram — рывки.

## Причина

Telegram на iOS открывает ссылки во встроенном браузере на базе **WKWebView**.
WKWebView управляет скроллом страницы через нативный `UIScrollView` — и делает это нестабильно
при сложных CSS-стилях (position: fixed, opacity, градиенты и т.д.).

## Решение

Перенести скролл с body/window на CSS-контейнер (`#root`).
WKWebView обрабатывает `overflow-y: scroll` на div-элементах намного стабильнее чем скролл страницы.

### CSS (`index.css`)

```css
html, body {
  height: 100%;
  overflow: hidden; /* отключаем скролл страницы */
}

#root {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* momentum scroll на iOS */
}
```

### JS — если используешь `window.scrollTo` (например, клик по логотипу)

Заменить на скролл контейнера:

```js
// Было:
window.scrollTo({ top: 0, behavior: 'smooth' });

// Стало:
document.getElementById('root')?.scrollTo({ top: 0, behavior: 'smooth' });
```

### Anchor-навигация

`scrollIntoView()` автоматически скроллит ближайший scrollable-предок — то есть `#root`. Работает без изменений.

Если нужен отступ под fixed/sticky навбар — добавить в CSS:

```css
section[id] {
  scroll-margin-top: 72px; /* высота навбара */
}
```

## Дополнительные оптимизации для мобильного

Все эти пункты влияют на плавность в WKWebView:

| Проблема | Фикс |
|---|---|
| `position: sticky` + `transform` | Убрать `transform: translateZ(0)` с навбара на мобиле |
| Большое изображение с opacity | Убрать `opacity < 1` с img, использовать оверлей |
| Фоновое изображение в герое | На мобиле заменить на CSS-градиент (`hidden md:block` на img) |
| `content-visibility: auto` | Убрать — в WKWebView вызывает рывок при входе секции в viewport |
| `position: fixed` Toast/элементы | Размонтировать из DOM когда невидим (`if (!isVisible) return null`) |
| Полупрозрачные фоны (`bg-black/95`) | Заменить на непрозрачные (`bg-black`) |
| `transition-all` | Заменить на конкретные свойства (`transition-colors`) |
| `backdrop-blur` | Убрать — очень тяжёлый на мобиле |

## Проверка

- ✅ Safari (iPhone) — плавно
- ✅ Telegram in-app browser (iPhone) — плавно
- ✅ Chrome (iPhone) — плавно
