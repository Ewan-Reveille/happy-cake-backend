<template>
  <MainLayout />
  <form method="post" class="flex flex-col w-[30%] mx-auto my-[150px]">
  <label for="pastry-name">Nom de la pâtisserie</label>
  <input type="text" name="pastry-name" id="pastry-name">
  
  <label for="pastry-description" class="mt-12">Description de la pâtisserie</label>
  <input type="text" name="pastry-description" id="pastry-description">

  <label for="pastry-price" class="mt-12">Prix de la pâtisserie</label>
  <input type="number" step="0.01"  name="pastry-price" id="pastry-price">

  <label for="image_url" class="mt-12">Lien de l'image</label>
  <input type="text"  name="image_url" id="image_url">
  
  <label for="pastry-type" class="mt-12">Type de la pâtisserie</label>
  <select name="pastry-type" id="pastry-type" class="bg-white">
      <option value="cake">Gâteau</option>
      <option value="individual-cake">Gâteau individuel</option>
      <option value="tarte">Tarte</option>
      <option value="entremet">Entremet</option>
      <option value="biscuit">Petit Biscuit</option>
  </select>

  <label for="allergens" class="mt-12 font-bold text-xl">Allergènes Présents</label>
  <div class="flex flex-col">

      <input class="relative top-5" type="checkbox" id="gluten" name="gluten">
      <label for="gluten">Gluten</label>
      
      <input class="relative top-5" type="checkbox" id="lactose" name="lactose">
      <label for="lactose">Lactose</label>
      
      <input class="relative top-5" type="checkbox" id="oeuf" name="oeuf">
      <label for="oeuf">Oeuf</label>
      
      <input class="relative top-5" type="checkbox" id="arachide" name="arachide">
      <label for="arachide">Arachide</label>
      
      <input class="relative top-5" type="checkbox" id="fruits-a-coque" name="fruits-a-coque">
      <label for="fruits-a-coque">Fruits à coque</label>
      
      <input class="relative top-5" type="checkbox" id="soja" name="soja">
      <label for="soja">Soja</label>
      
      <input class="relative top-5" type="checkbox" id="poisson" name="poisson">
      <label for="poisson">Poisson</label>
      
      <input class="relative top-5" type="checkbox" id="crustace" name="crustace">
      <label for="crustace">Crustacé</label>
  </div>

  <button type="submit" class="my-12 bg-pink-300 w-[40%] mx-auto rounded-xl h-[45px]">
      Publier l'article
  </button>
</form>


</template>

<script>

const createPastry = async (formData) => {
    try {
        const response = await fetch('/api/prisma/create-pastry', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData['pastry-name'],
                type: formData['pastry-type'],
                description: formData['pastry-description'],
                price: parseInt(formData['pastry-price']) * 100,
                allergens: {
                    gluten: formData['gluten'] ? true : false,
                    lactose: formData['lactose'] ? true : false,
                    oeuf: formData['oeuf'] ? true : false,
                    arachide: formData['arachide'] ? true : false,
                    'fruits-a-coque': formData['fruits-a-coque'] ? true : false,
                    soja: formData['soja'] ? true : false,
                    poisson: formData['poisson'] ? true : false,
                    crustace: formData['crustace'] ? true : false,
                },
               imagePath: formData['image_url']
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create pastry');
        }

        const data = await response.json();
        console.log('Pastry created:', data);
    } catch (error) {
        console.error('Error creating pastry:', error);
    }
}
export default {
  mounted() {
    if (process.client) {
      const form = document.querySelector('form');

      form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Get form data
        const formData = new FormData(form);
        const formDataObject = {};
        
        // Convert FormData to object
        formData.forEach((value, key) => {
          formDataObject[key] = value;
        });

        // Log form data
        console.log('Form Data:', formDataObject);

        // Call createPastry with form data
        await createPastry(formDataObject);
      });
    }
  }
}




</script>

<style scoped>
  input{
    border: solid black 1px;
    border-radius: 15px;
    padding-left: 15px;
  }
</style>