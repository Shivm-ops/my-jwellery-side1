from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.contrib.sessions.models import Session
from jewellery_api.models import UserProfile, Order, CartItem

User = get_user_model()

class Command(BaseCommand):
    help = 'Clear all authentication data including users, profiles, sessions, and related data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--confirm',
            action='store_true',
            help='Confirm that you want to delete all authentication data',
        )

    def handle(self, *args, **options):
        if not options['confirm']:
            self.stdout.write(
                self.style.WARNING(
                    'This will delete ALL user accounts, profiles, sessions, and related data!\n'
                    'Use --confirm flag to proceed with deletion.'
                )
            )
            return

        # Count items before deletion
        user_count = User.objects.count()
        profile_count = UserProfile.objects.count()
        session_count = Session.objects.count()
        order_count = Order.objects.count()
        cart_count = CartItem.objects.count()

        self.stdout.write(f'Found {user_count} users')
        self.stdout.write(f'Found {profile_count} user profiles')
        self.stdout.write(f'Found {session_count} sessions')
        self.stdout.write(f'Found {order_count} orders')
        self.stdout.write(f'Found {cart_count} cart items')

        # Delete all authentication-related data
        self.stdout.write('Deleting all user profiles...')
        UserProfile.objects.all().delete()

        self.stdout.write('Deleting all user accounts...')
        User.objects.all().delete()

        self.stdout.write('Deleting all sessions...')
        Session.objects.all().delete()

        self.stdout.write('Deleting all orders...')
        Order.objects.all().delete()

        self.stdout.write('Deleting all cart items...')
        CartItem.objects.all().delete()

        # Verify deletion
        remaining_users = User.objects.count()
        remaining_profiles = UserProfile.objects.count()
        remaining_sessions = Session.objects.count()
        remaining_orders = Order.objects.count()
        remaining_carts = CartItem.objects.count()

        self.stdout.write(
            self.style.SUCCESS(
                f'Authentication data cleared successfully!\n'
                f'Remaining users: {remaining_users}\n'
                f'Remaining profiles: {remaining_profiles}\n'
                f'Remaining sessions: {remaining_sessions}\n'
                f'Remaining orders: {remaining_orders}\n'
                f'Remaining cart items: {remaining_carts}'
            )
        )
