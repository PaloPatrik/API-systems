let currentPokemonId = null;
    const fetchPokemon = async () => {
      const query = document.getElementById('search').value.toLowerCase();
      let url = '';
      if (isNaN(query)) {
        url = `https://pokeapi.co/api/v2/pokemon/${query}`;
      } else {
        url = `https://pokeapi.co/api/v2/pokemon/${query}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        currentPokemonId = data.id;
        displayPokemon(data);
      } catch (error) {
        alert('Pokémonia ei löytynyt!');
      }
    };

    const displayPokemon = (data) => {
      const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
      const id = data.id;
      const types = data.types.map(typeInfo => typeInfo.type.name);
      const weight = data.weight / 10; 
      const height = data.height / 10;  
      const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join('<br>');
      const abilities = data.abilities.map(ability => ability.ability.name).join('<br>');

      document.getElementById('pokemon-name').innerText = name;
      document.getElementById('pokedex-number').innerText = id;
      document.getElementById('weight').innerText = weight;
      document.getElementById('height').innerText = height;
      document.getElementById('types').innerHTML = types.map(type => `<span class="type ${type}">${type}</span>`).join('');
      document.getElementById('stats').innerHTML = stats;
      document.getElementById('abilities').innerHTML = abilities;

      document.getElementById('pokemon-details').style.display = 'block';
      document.getElementById('shiny-img').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;

      document.getElementById('sound-button').onclick = () => {
        const audio = new Audio(`https://pokemoncries.com/cries/${id}.mp3`);
        audio.play();
      };
    };

    const fetchAdjacentPokemon = async (direction) => {
      const nextId = direction === 'next' ? currentPokemonId + 1 : currentPokemonId - 1;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nextId}`);
        const data = await response.json();
        currentPokemonId = data.id;
        displayPokemon(data);
      } catch (error) {
        alert('Ei löytynyt seuraavaa/edellistä Pokémonia!');
      }
    };