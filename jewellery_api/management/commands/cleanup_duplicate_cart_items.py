from django.core.management.base import BaseCommand
from jewellery_api.models import CartItem
from django.db.models import Sum

class Command(BaseCommand):
    help = 'Clean up duplicate cart items by merging quantities'

    def handle(self, *args, **options):
        # Find all duplicate cart items (same product and session)
        duplicates = CartItem.objects.values('product', 'session_id').annotate(
            count=Sum('quantity')
        ).filter(count__gt=1)

        total_cleaned = 0
        
        for duplicate in duplicates:
            product_id = duplicate['product']
            session_id = duplicate['session_id']
            total_quantity = duplicate['count']
            
            # Get all cart items for this product and session
            cart_items = CartItem.objects.filter(
                product_id=product_id,
                session_id=session_id
            ).order_by('created_at')
            
            if cart_items.count() > 1:
                # Keep the first one, delete the rest
                first_item = cart_items.first()
                first_item.quantity = total_quantity
                first_item.save()
                
                # Delete the rest
                cart_items.exclude(id=first_item.id).delete()
                
                total_cleaned += cart_items.count() - 1
                
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Cleaned up {cart_items.count() - 1} duplicate items for product {first_item.product.name}'
                    )
                )
        
        self.stdout.write(
            self.style.SUCCESS(f'Total duplicate items cleaned: {total_cleaned}')
        )
