const graphql = require('graphql');

// Models
const User = require('../models/user');
const Product = require('../models/product');
const Shop = require('../models/shop');
const Category = require('../models/category');
var GraphQLDate = require('graphql-date');


const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLFloat,
    GraphQLList
} = graphql;

// Orders Schema
const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        cart: {type: CartType},
        date: {type: GraphQLDate}
    })
});

// Cart Schema 
const CartType = new GraphQLObjectType({
    name: 'Cart',
    fields: () => ({
        products: {type: new GraphQLList(ProductCartType)},
        total: {type: GraphQLFloat}
    })
});

// ProductCart Schema
const ProductCartType = new GraphQLObjectType({
    name: 'ProductCart',
    fields: () => ({
        productId: {type: GraphQLString},
        quantity: {type: GraphQLInt},
        productDetails: {
            type: ProductType,
            resolve: (parent, args) => {
                return Product.findById(parent.productId);
            }
        }
    })
});

// User Schema
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},
        nickname: {type: GraphQLString},
        password: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
        phone: {type: GraphQLString},
        avatar: {type: GraphQLString},
        role: {type: GraphQLString},
        birthdate: {type: GraphQLDate},
        gender: {type: GraphQLString},
        country: {type: GraphQLString},
        language: {type: GraphQLString},
        currency: {type: GraphQLString},
        about: {type: GraphQLString},
        banned: {type: GraphQLBoolean},
        emailSuscribed: {type: GraphQLBoolean},
        billingAddress: {type: GraphQLString},
        shippingAddress: {type: GraphQLString},
        createdAt: {type: GraphQLDate},
        updatedAt: {type: GraphQLDate},
        deletedAt: {type: GraphQLDate},
        cart: {type: CartType},
        wishList: {type: CartType},
        purchases: {type: OrderType},
        unsuccess: {type: OrderType}

        // Shops
    })
});

// Rating Schema
const RatingType = new GraphQLObjectType({
    name: 'Rating',
    fields: () => ({
        ratingType: {type: GraphQLString},
        value: {type: GraphQLInt}
    })
});

// Variation Schema
const VariationType = new GraphQLObjectType({
    name: 'Variation',
    fields: () => ({
        sizes: {
            type: new GraphQLList(GraphQLString),
            resolve: (parent, args) => {
                return parent.sizes;
            }
        },
        colors: {
            type: new GraphQLList(GraphQLString),
            resolve: (parent, args) => {
                return parent.colors;
            }
        },
        materials: {
            type: new GraphQLList(GraphQLString),
            resolve: (parent, args) => {
                return parent.materials;
            }
        }
    })
});

// Comment Schema
const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
        text: {type: GraphQLString},
        userId: {type: GraphQLString},
        user: {
            type: UserType,
            resolve: (parent, args) => {
                console.log(User.findById(parent.userId));
                return User.findById(parent.userId);
            }
        },
        date: {type: GraphQLDate}
    })
});

// Product Schema
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        serial: {type: GraphQLString},
        price: {type: GraphQLString},
        currency: {type: GraphQLString},
        brand: {type: GraphQLString},
        condition: {type: GraphQLString},
        mainPicture: {type: GraphQLString},
        description: {type: GraphQLString},
        stock: {type: GraphQLInt},
        onOffer: {type: GraphQLBoolean},
        discount: {type: GraphQLInt},
        sold: {type: GraphQLInt},
        featured: {type: GraphQLBoolean},
        url: {type: GraphQLString},
        pictures: {
            type: new GraphQLList(GraphQLString)
        },
        variations: {type: VariationType},
        rating: {type: RatingType},
        comments: {
            type: new GraphQLList(CommentType)
        },
        createdAt: {type: GraphQLDate},
        updatedAt: {type: GraphQLDate},
        deletedAt: {type: GraphQLDate},
    })
});

// Categories Schema

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: {type: GraphQLID},
        icon: {type: GraphQLString},
        createdAt: {type: GraphQLDate},
        deletedAt: {type: GraphQLDate}
    })
});

// Shops schemas

const ShopType = new GraphQLObjectType({
    name: 'Shop',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        cover: {type: GraphQLString},
        logo: {type: GraphQLString},
        language: {type: GraphQLString},
        country: {type: GraphQLString},
        currency: {type: GraphQLString},
        billingAddress: {type: GraphQLString},
        shippingAddress: {type: GraphQLString},
        createdAt: {type: GraphQLDate},
        updatedAt: {type: GraphQLDate},
        deletedAt: {type: GraphQLDate},
        users: {
            type: new GraphQLList(UserType),
            resolve: (parent, args) => {
                return parent.users.map(id => {
                    return User.findById(parent.users[id]);
                });
            }
        }
    })
});

//////////////////////////////////////////////////////////////////////////////

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {

        createUser: {
            type: UserType,
            args: {
                nickname: {type: GraphQLString},
                firstname: {type: GraphQLString},
                lastname: {type: GraphQLString},
                password: {type: GraphQLString},
                email: {type: GraphQLString},
                age: {type: GraphQLInt},
                phone: {type: GraphQLString},
                avatar: {type: GraphQLString},
                role: {type: GraphQLString},
                birthdate: {type: GraphQLString},
                gender: {type: GraphQLString},
                country: {type: GraphQLString},
                language: {type: GraphQLString},
                currency: {type: GraphQLString},
                about: {type: GraphQLString},
                emailSuscribed: {type: GraphQLBoolean},
                billingAddress: {type: GraphQLString},
                shippingAddress: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = new User({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    nickname: args.nickname,
                    password: args.password,
                    email: args.email,
                    age: args.age,
                    phone: args.phone,
                    avatar: args.avatar,
                    role: args.role,
                    birthdate: args.birthdate,
                    gender: args.gender,
                    country: args.country,
                    language: args.language,
                    currency: args.currency,
                    about: args.about,
                    emailSuscribed: args.emailSuscribed,
                    billingAddress: args.billingAddress,
                    shippingAddress: args.shippingAddress,
                });

                return user.save((error) => {
                    if (error) console.log(error.message);
                    else console.log("User created succesfully");
                });
            }
        },
        
        createProduct: {
            type: ProductType,
            args: {
                name: {type: GraphQLString},
                serial: {type: GraphQLString},
                price: {type: GraphQLFloat},
                currency: {type: GraphQLString},
                brand: {type: GraphQLString},
                condition: {type: GraphQLString},
                mainPicture: {type: GraphQLString},
                description: {type: GraphQLString},
                stock: {type: GraphQLInt},
                onOffer: {type: GraphQLBoolean},
                discount: {type: GraphQLFloat},
                sold: {type: GraphQLInt},
                featured: {type: GraphQLBoolean},
                url: {type: GraphQLString},
                pictures: {type: GraphQLString},
                ratingType: {type: GraphQLString},
                ratingValue: {type: GraphQLInt}
            },
            resolve (parent, args) {
                                
                let product = new Product({
                    name: args.name,
                    serial: args.serial,
                    price: args.price,
                    currency: args.currency,
                    brand: args.brand,
                    condition: args.condition,
                    mainPicture: args.mainPicture,
                    description: args.description,
                    stock: args.stock,
                    onOffer: args.onOffer,
                    discount: args.discount,
                    sold: args.sold,
                    featured: args.featured,
                    url: args.url,
                    pictures: args.pictures,
                    rating: {
                        ratingType: args.ratingType,
                        value: args.ratingValue
                    }
                });

                return product.save((error) => {
                    if (error) console.log(error.message);
                    else console.log('Product created successfully');
                });
            }
        },

        createCategory: {
            type: CategoryType,
            args: {
                name: {type: GraphQLString},
                icon: {type: GraphQLString},
            },
            resolve (parent, args) {
                let category = new Category({
                    name: args.name,
                    icon: args.name
                });

                return category.save((error) => {
                    if (error) console.log(error.message);
                    else console.log('Category created successfully.');
                });
            }

        },

        createShop: {
            type: ShopType,
            args: {
                name: {type: GraphQLString},
                language: {type: GraphQLString},
                country: {type: GraphQLString},
                currency: {type: GraphQLString},
                billingAddress: {type: GraphQLString},
                shippingAddress: {type: GraphQLString}
            },
            resolve (parent, args) {
                let shop = new Shop({
                    name: args.name,
                    language: args.language,
                    country: args.country,
                    currency: args.currency,
                    billingAddress: args.billingAddress,
                    shippingAddress: args.shippingAddress
                });

                return shop.save((error) => {
                    if (error) console.log(error.message);
                    else console.log('Shop created successfully.');
                });
            }
        }

        // updateProgrammer: {
        //     type: ProgrammerType,
        //     args: {
        //         id: {name: 'id', type: GraphQLID},
        //         name: {type: GraphQLString},
        //         email: {type: GraphQLString},
        //         age: {type: GraphQLString},
        //         projectId: {type: GraphQLID}            
        //     },
        //     resolve (parent, args) {

        //         let programmer = {};

        //         for (let prop in args) {
        //             programmer[prop] = args[prop];
        //         }

        //         return Programmer.findByIdAndUpdate(args.id,
        //             { $set: programmer },
        //             { new: true }
        //         );
        //     }
        // }
    }
});

// Queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
               return User.findById(args.id);
            }
        },
        product: {
            type: ProductType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Product.findById(args.id);
            }
        },
        category: {
            type: CategoryType,
            args: {id: {type: GraphQLID}},
            resolve (parent, args) {
                return Category.findById(args.id);
            }
        },
        shop: {
            type: ShopType,
            args: {id: {type: GraphQLID}},
            resolve (parent, args) {
                return ShopType.findById(args.id);
            }
        },
        users: {
            type: GraphQLList(UserType),
            resolve (parent, args) {
                return User.find({});
            }
        },
        products: {
            type: GraphQLList(ProductType),
            resolve (parent, args) {
                return Product.find({});
            }
        },
        shops: {
            type: GraphQLList(ShopType),
            resolve(parent, args) {
                return Shop.find({});
            }
        },
        categories: {
            type: GraphQLList(CategoryType),
            resolve (parent, args) {
                return Category.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});