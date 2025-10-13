from django.core.management.base import BaseCommand
from jewellery_api.models import Product

class Command(BaseCommand):
    help = 'Seed the database with sample jewelry products'

    def handle(self, *args, **options):
        products_data = [
            {
                'id': '1',
                'name': 'Diamond Solitaire Ring',
                'description': 'Elegant 18k white gold ring featuring a stunning 1.5 carat diamond solitaire. Perfect for engagements or special occasions.',
                'price': 4999.00,
                'material': 'White Gold, Diamond',
                'category': 'rings',
                'imageUrl': 'https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=800',
                'inStock': True,
                'featured': True,
            },
            {
                'id': '2',
                'name': 'Pearl Pendant Necklace',
                'description': 'Timeless freshwater pearl necklace set in 14k yellow gold. A classic piece that adds elegance to any outfit.',
                'price': 899.00,
                'material': 'Yellow Gold, Pearl',
                'category': 'necklaces',
                'imageUrl': 'https://images.pexels.com/photos/1458837/pexels-photo-1458837.jpeg?auto=compress&cs=tinysrgb&w=800',
                'inStock': True,
                'featured': True,
            },
            {
                'id': '3',
                'name': 'Emerald Drop Earrings',
                'description': 'Exquisite emerald drop earrings set in platinum with diamond accents. A stunning statement piece.',
                'price': 2499.00,
                'material': 'Platinum, Emerald, Diamond',
                'category': 'earrings',
                'imageUrl': 'https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800',
                'inStock': True,
                'featured': True,
            },
            {
                'id': '4',
                'name': 'Rose Gold Tennis Bracelet',
                'description': 'Luxurious tennis bracelet crafted in 18k rose gold with brilliant cut diamonds throughout.',
                'price': 3299.00,
                'material': 'Rose Gold, Diamond',
                'category': 'bracelets',
                'imageUrl': 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '6',
                'name': 'Gold Chain',
                'description': 'Classic 18k yellow gold chain necklace. Versatile and timeless design suitable for everyday wear.',
                'price': 1299.00,
                'material': 'Yellow Gold',
                'category': 'necklaces',
                'imageUrl': 'https://images.unsplash.com/photo-1721807550979-6e662d370e92?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '7',
                'name': 'Diamond Stud Earrings',
                'description': 'Brilliant diamond stud earrings in 14k white gold. A must-have classic for every jewelry collection.',
                'price': 1599.00,
                'material': 'White Gold, Diamond',
                'category': 'earrings',
                'imageUrl': 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=800',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '8',
                'name': 'Silver Charm Bracelet',
                'description': 'Beautiful sterling silver charm bracelet with customizable charms. Perfect for creating personal stories.',
                'price': 599.00,
                'material': 'Sterling Silver',
                'category': 'bracelets',
                'imageUrl': 'https://images.pexels.com/photos/1460838/pexels-photo-1460838.jpeg?auto=compress&cs=tinysrgb&w=800',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '9',
                'name': 'Ruby Eternity Ring',
                'description': 'Stunning ruby eternity ring in 18k yellow gold. Symbolizes eternal love and commitment.',
                'price': 2799.00,
                'material': 'Yellow Gold, Ruby',
                'category': 'rings',
                'imageUrl': 'https://images.unsplash.com/photo-1677466891119-2baa2f2ba447?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '10',
                'name': 'Layered Gold Necklace',
                'description': 'Trendy layered necklace in 14k yellow gold. Perfect for modern, fashion-forward looks.',
                'price': 799.00,
                'material': 'Yellow Gold',
                'category': 'necklaces',
                'imageUrl': 'https://images.pexels.com/photos/1458837/pexels-photo-1458837.jpeg?auto=compress&cs=tinysrgb&w=800',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '11',
                'name': 'Crystal Hoop Earrings',
                'description': 'Elegant crystal-embellished hoop earrings in sterling silver. Adds sparkle to any ensemble.',
                'price': 399.00,
                'material': 'Sterling Silver, Crystal',
                'category': 'earrings',
                'imageUrl': 'https://images.unsplash.com/photo-1648291531524-97afa1c2ac30?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '12',
                'name': 'Infinity Bracelet',
                'description': 'Delicate infinity symbol bracelet in rose gold. Represents endless possibilities and love.',
                'price': 449.00,
                'material': 'Rose Gold',
                'category': 'bracelets',
                'imageUrl': 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '13',
                'name': 'Gold Ring',
                'description': '24 carat',
                'price': 12117.00,
                'material': 'Gold 24 Carat',
                'category': 'rings',
                'imageUrl': 'https://images.unsplash.com/photo-1731586249471-82bb9b2f769a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
                'inStock': True,
                'featured': True,
            },
        ]

        # Clear existing products
        Product.objects.all().delete()
        self.stdout.write('Cleared existing products...')

        # Create new products
        for product_data in products_data:
            Product.objects.create(**product_data)
            self.stdout.write(f'Created product: {product_data["name"]}')

        self.stdout.write(
            self.style.SUCCESS(f'Successfully seeded {len(products_data)} products!')
        )
