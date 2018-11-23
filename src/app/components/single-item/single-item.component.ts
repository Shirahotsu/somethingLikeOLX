import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  public forU:any;
  private sub: any;
  public id:number;
  public itemObj:any;
  constructor(
    private route: ActivatedRoute
  ) {
    this.forU= [
      {
        price: 150,
        image: '../../assets/37385011_1822617344489114_2492916743651983360_n.jpg',
        link: 'link',
        name: 'kosiarka',
        id:0,
        cat: "samochody",
        author:"Jan Kowaslski",
        score: 5,
        votes: 500,
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos culpa accusantium numquam aut laborum, alias veritatis? Rerum blanditiis molestias esse quas omnis. Esse ab, aliquid facere quisquam eos dicta voluptatibus, ratione numquam unde temporibus quos nobis magni? Aliquam, vero natus. Reprehenderit voluptas laudantium veniam eveniet optio excepturi voluptatum animi itaque, repellendus ea pariatur dicta repudiandae accusamus maiores dolorem voluptatem atque necessitatibus dolor? Optio eos quasi sunt, ut necessitatibus suscipit minima ullam error, aliquid corrupti molestiae odit. Dolor temporibus ducimus ipsum? Aperiam, laudantium exercitationem quae, quisquam vitae odit reprehenderit vero saepe aliquid illum alias quas voluptatem deleniti adipisci itaque neque officia veritatis quos modi quo atque totam, id natus sit. Deleniti facere perferendis laudantium a obcaecati vel unde itaque quam sunt eius commodi ipsum repellendus voluptates nisi exercitationem dicta officia recusandae nemo vitae similique, magni deserunt reprehenderit delectus! Quibusdam unde doloribus quo dolorum quis cumque iusto tempore autem culpa dolor illum, vero soluta impedit magni deleniti, fuga tempora, rem maxime quam non. Similique, repellat necessitatibus amet, vero delectus non, magni alias consectetur repellendus nobis in. Voluptas ullam beatae blanditiis distinctio fugiat eos consectetur quia ex voluptatibus quaerat, cupiditate, iste iure impedit labore laboriosam recusandae ipsam reprehenderit unde, repellat temporibus nam deleniti!"
      },
      {
        price: 312,
        image: '../../assets/72.jpg',
        link: 'link',
        name: 'zmywarka',
        id:1,
        cat: "agd rtv",
        author:"Jan Kowaslski2",
        score: 5,
        votes: 500,
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos culpa accusantium numquam aut laborum, alias veritatis? Rerum blanditiis molestias esse quas omnis. Esse ab, aliquid facere quisquam eos dicta voluptatibus, ratione numquam unde temporibus quos nobis magni? Aliquam, vero natus. Reprehenderit voluptas laudantium veniam eveniet optio excepturi voluptatum animi itaque, repellendus ea pariatur dicta repudiandae accusamus maiores dolorem voluptatem atque necessitatibus dolor? Optio eos quasi sunt, ut necessitatibus suscipit minima ullam error, aliquid corrupti molestiae odit. Dolor temporibus ducimus ipsum? Aperiam, laudantium exercitationem quae, quisquam vitae odit reprehenderit vero saepe aliquid illum alias quas voluptatem deleniti adipisci itaque neque officia veritatis quos modi quo atque totam, id natus sit. Deleniti facere perferendis laudantium a obcaecati vel unde itaque quam sunt eius commodi ipsum repellendus voluptates nisi exercitationem dicta officia recusandae nemo vitae similique, magni deserunt reprehenderit delectus! Quibusdam unde doloribus quo dolorum quis cumque iusto tempore autem culpa dolor illum, vero soluta impedit magni deleniti, fuga tempora, rem maxime quam non. Similique, repellat necessitatibus amet, vero delectus non, magni alias consectetur repellendus nobis in. Voluptas ullam beatae blanditiis distinctio fugiat eos consectetur quia ex voluptatibus quaerat, cupiditate, iste iure impedit labore laboriosam recusandae ipsam reprehenderit unde, repellat temporibus nam deleniti!"
      },
      {
        price: 15350,
        image: '../../assets/comment_B6acukMO6ks2Z6U7czHPXdZVhiCIE3OQ.jpg',
        link: 'link',
        name: 'debil',
        id:2,
        cat: "obuwie",
        author:"Jan Kowaslski3",
        score: 5,
        votes: 500,
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos culpa accusantium numquam aut laborum, alias veritatis? Rerum blanditiis molestias esse quas omnis. Esse ab, aliquid facere quisquam eos dicta voluptatibus, ratione numquam unde temporibus quos nobis magni? Aliquam, vero natus. Reprehenderit voluptas laudantium veniam eveniet optio excepturi voluptatum animi itaque, repellendus ea pariatur dicta repudiandae accusamus maiores dolorem voluptatem atque necessitatibus dolor? Optio eos quasi sunt, ut necessitatibus suscipit minima ullam error, aliquid corrupti molestiae odit. Dolor temporibus ducimus ipsum? Aperiam, laudantium exercitationem quae, quisquam vitae odit reprehenderit vero saepe aliquid illum alias quas voluptatem deleniti adipisci itaque neque officia veritatis quos modi quo atque totam, id natus sit. Deleniti facere perferendis laudantium a obcaecati vel unde itaque quam sunt eius commodi ipsum repellendus voluptates nisi exercitationem dicta officia recusandae nemo vitae similique, magni deserunt reprehenderit delectus! Quibusdam unde doloribus quo dolorum quis cumque iusto tempore autem culpa dolor illum, vero soluta impedit magni deleniti, fuga tempora, rem maxime quam non. Similique, repellat necessitatibus amet, vero delectus non, magni alias consectetur repellendus nobis in. Voluptas ullam beatae blanditiis distinctio fugiat eos consectetur quia ex voluptatibus quaerat, cupiditate, iste iure impedit labore laboriosam recusandae ipsam reprehenderit unde, repellat temporibus nam deleniti!"
      },
      {
        price: 2,
        image: '../../assets/parrot.jpg',
        link: 'link',
        name: 'A jooo',
        id:3,
        cat: "obuwie",
        author:"Jan Kowaslski4",
        score: 5,
        votes: 500,
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos culpa accusantium numquam aut laborum, alias veritatis? Rerum blanditiis molestias esse quas omnis. Esse ab, aliquid facere quisquam eos dicta voluptatibus, ratione numquam unde temporibus quos nobis magni? Aliquam, vero natus. Reprehenderit voluptas laudantium veniam eveniet optio excepturi voluptatum animi itaque, repellendus ea pariatur dicta repudiandae accusamus maiores dolorem voluptatem atque necessitatibus dolor? Optio eos quasi sunt, ut necessitatibus suscipit minima ullam error, aliquid corrupti molestiae odit. Dolor temporibus ducimus ipsum? Aperiam, laudantium exercitationem quae, quisquam vitae odit reprehenderit vero saepe aliquid illum alias quas voluptatem deleniti adipisci itaque neque officia veritatis quos modi quo atque totam, id natus sit. Deleniti facere perferendis laudantium a obcaecati vel unde itaque quam sunt eius commodi ipsum repellendus voluptates nisi exercitationem dicta officia recusandae nemo vitae similique, magni deserunt reprehenderit delectus! Quibusdam unde doloribus quo dolorum quis cumque iusto tempore autem culpa dolor illum, vero soluta impedit magni deleniti, fuga tempora, rem maxime quam non. Similique, repellat necessitatibus amet, vero delectus non, magni alias consectetur repellendus nobis in. Voluptas ullam beatae blanditiis distinctio fugiat eos consectetur quia ex voluptatibus quaerat, cupiditate, iste iure impedit labore laboriosam recusandae ipsam reprehenderit unde, repellat temporibus nam deleniti!"
      },
      {
        price: 213,
        image: '../../assets/annie-spratt-61214-unsplash (1).jpg',
        link: 'link',
        name: 'Toja Stara',
        id:4,
        cat: "agd rtv",
        author:"Jan Kowaslski5",
        score: 5,
        votes: 500,
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos culpa accusantium numquam aut laborum, alias veritatis? Rerum blanditiis molestias esse quas omnis. Esse ab, aliquid facere quisquam eos dicta voluptatibus, ratione numquam unde temporibus quos nobis magni? Aliquam, vero natus. Reprehenderit voluptas laudantium veniam eveniet optio excepturi voluptatum animi itaque, repellendus ea pariatur dicta repudiandae accusamus maiores dolorem voluptatem atque necessitatibus dolor? Optio eos quasi sunt, ut necessitatibus suscipit minima ullam error, aliquid corrupti molestiae odit. Dolor temporibus ducimus ipsum? Aperiam, laudantium exercitationem quae, quisquam vitae odit reprehenderit vero saepe aliquid illum alias quas voluptatem deleniti adipisci itaque neque officia veritatis quos modi quo atque totam, id natus sit. Deleniti facere perferendis laudantium a obcaecati vel unde itaque quam sunt eius commodi ipsum repellendus voluptates nisi exercitationem dicta officia recusandae nemo vitae similique, magni deserunt reprehenderit delectus! Quibusdam unde doloribus quo dolorum quis cumque iusto tempore autem culpa dolor illum, vero soluta impedit magni deleniti, fuga tempora, rem maxime quam non. Similique, repellat necessitatibus amet, vero delectus non, magni alias consectetur repellendus nobis in. Voluptas ullam beatae blanditiis distinctio fugiat eos consectetur quia ex voluptatibus quaerat, cupiditate, iste iure impedit labore laboriosam recusandae ipsam reprehenderit unde, repellat temporibus nam deleniti!"
      },
      {
        price: 1511100,
        image: '../../assets/cropped-1920-1080-587597.jpg',
        link: 'link',
        name: 'kibel',
        id:5,
        cat: "samochody",
        author:"Jan Kowaslski5",
        score: 5,
        votes: 500,
        content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos culpa accusantium numquam aut laborum, alias veritatis? Rerum blanditiis molestias esse quas omnis. Esse ab, aliquid facere quisquam eos dicta voluptatibus, ratione numquam unde temporibus quos nobis magni? Aliquam, vero natus. Reprehenderit voluptas laudantium veniam eveniet optio excepturi voluptatum animi itaque, repellendus ea pariatur dicta repudiandae accusamus maiores dolorem voluptatem atque necessitatibus dolor? Optio eos quasi sunt, ut necessitatibus suscipit minima ullam error, aliquid corrupti molestiae odit. Dolor temporibus ducimus ipsum? Aperiam, laudantium exercitationem quae, quisquam vitae odit reprehenderit vero saepe aliquid illum alias quas voluptatem deleniti adipisci itaque neque officia veritatis quos modi quo atque totam, id natus sit. Deleniti facere perferendis laudantium a obcaecati vel unde itaque quam sunt eius commodi ipsum repellendus voluptates nisi exercitationem dicta officia recusandae nemo vitae similique, magni deserunt reprehenderit delectus! Quibusdam unde doloribus quo dolorum quis cumque iusto tempore autem culpa dolor illum, vero soluta impedit magni deleniti, fuga tempora, rem maxime quam non. Similique, repellat necessitatibus amet, vero delectus non, magni alias consectetur repellendus nobis in. Voluptas ullam beatae blanditiis distinctio fugiat eos consectetur quia ex voluptatibus quaerat, cupiditate, iste iure impedit labore laboriosam recusandae ipsam reprehenderit unde, repellat temporibus nam deleniti!"
      }
    ];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['name']; // (+) converts string 'id' to a number
      // In a real app: dispatch action to load the details here.
      this.getFromArray(this.id);
  });
  }
  getFromArray(e){
    this.itemObj = this.forU[e];
  }

}
