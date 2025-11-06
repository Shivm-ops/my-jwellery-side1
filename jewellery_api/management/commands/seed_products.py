from django.core.management.base import BaseCommand
from jewellery_api.models import Product

class Command(BaseCommand):
    help = 'Seed the database with sample jewelry products'

    def handle(self, *args, **options):
        products_data = [
            {
                'id': '1',
                'name': 'Classic Gold Wedding Ring',
                'description': 'Elegant 18k yellow gold wedding ring with a timeless design. Perfect for engagements, weddings, or special occasions.',
                'price': 1299.00,
                'material': '18k Yellow Gold',
                'category': 'rings',
                'imageUrl': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000',
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
                'name': 'Gold Drop Earrings',
                'description': 'Exquisite 18k yellow gold drop earrings with elegant design. A stunning statement piece that adds sophistication to any outfit.',
                'price': 899.00,
                'material': '18k Yellow Gold',
                'category': 'earrings',
                'imageUrl': 'https://images.unsplash.com/photo-1535632066927-ab7c9f2a3b76?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000',
                'inStock': True,
                'featured': True,
            },
            {
                'id': '4',
                'name': 'Gold Link Bracelet',
                'description': 'Luxurious 18k yellow gold link bracelet with classic design. Perfect for everyday elegance or special occasions.',
                'price': 1299.00,
                'material': '18k Yellow Gold',
                'category': 'bracelets',
                'imageUrl': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000',
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
                'name': 'Gold Stud Earrings',
                'description': 'Classic 18k yellow gold stud earrings. A must-have classic for every jewelry collection.',
                'price': 599.00,
                'material': '18k Yellow Gold',
                'category': 'earrings',
                'imageUrl': 'https://i.pinimg.com/736x/4d/41/00/4d410002514c0de148970724c507dadc.jpg',
                'inStock': True,
                'featured': False,
            },
            {
                'id': '8',
                'name': 'gold manglsutra',
                'description': 'Beautiful sterling gold manglsutra with customizable charms. Perfect for creating personal stories.',
                'price': 2000,
                'material': 'Sterling gold',
                'category': 'bracelets',
                'imageUrl': 'https://i.pinimg.com/736x/32/68/7a/32687ae3ea6690d2b33c455f2166c834.jpg',
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
                'name': 'silver toe',
                'description': 'Trendy silver toe. Perfect for modern, fashion-forward looks.',
                'price': 799.00,
                'material': 'silver',
                'category': 'toe',
                'imageUrl': 'https://i.pinimg.com/736x/68/5a/05/685a0591a42cf8633fc7a8d35beb7596.jpg',
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
            # Additional Gold Jewelry
            {
                'id': '14',
                'name': 'Premium Gold Ring',
                'description': 'Exquisite 24k pure gold ring with intricate craftsmanship. A luxury piece for special occasions.',
                'price': 2999.00,
                'material': '24k Pure Gold',
                'category': 'rings',
                'imageUrl': 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000',
                'inStock': True,
                'featured': True,
            },
            {
                'id': '15',
                'name': 'Gold Statement Necklace',
                'description': 'Bold 18k yellow gold statement necklace with modern geometric design. Perfect for making a fashion statement.',
                'price': 1899.00,
                'material': '18k Yellow Gold',
                'category': 'necklaces',
                'imageUrl': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1000',
                'inStock': True,
                'featured': False,
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
