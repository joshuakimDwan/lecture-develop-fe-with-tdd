var Trelno = Trelno || {};

Trelno.BoardDisplay = (id, name, cardDisplayList = []) => {
  let display = {
    cardList() {
      return cardDisplayList.reduce((arr, cardDisplay)=> {
        if (typeof cardDisplay.element !== 'function') return arr;
        arr.push(cardDisplay.element());
        return arr;
      }, []);
    },

    html() {
      return `
        <div class="board">
          <h2 class="title font-gray">${name}</h2>
          <ul class="card-list"></ul>
          <div class="add-card">
            <a href="#" class="add-card-link">Add a card...</a>
          </div>
        </div>`;
    },

    bindDropEvent(el) {
      el.on('drop', e => {
        e.preventDefault();
        id = e.originalEvent.dataTransfer.getData('id');
        $(e.target).parents('.board').find('ul.card-list').append($(`#${id}`));
      });

      el.on('dragover', e => {
        e.preventDefault();
      })
    },

    bindDragEvent(el) {
      el.on('dragstart', e => {
        e.originalEvent.dataTransfer.setData('id', e.target.id)
      })
    },

    element() {
      const el = $(display.html());

      display.bindDropEvent(el);

      display.cardList().forEach(cardEl => {
        const li = $(`<li id="${cardEl.data('card-id')}" draggable="true"></li>`);
        display.bindDragEvent(li)
        li.append(cardEl);
        el.find('ul.card-list').append(li);
      });

      return el;
    }
  }

  return display;
}
