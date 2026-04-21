from django.core.management.base import BaseCommand
from django.utils.text import slugify
from courses.models import Category, Course, CourseOutcome, CourseModule


COURSES = [
    # ── Computer ──────────────────────────────────────────────
    {
        'category': 'Computer',
        'title': 'Operations Computer',
        'image_url': 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
        'description': 'Foundational computer operations for everyday professional use.',
        'overview': 'This course introduces students to essential computer operations used in modern workplaces. Students learn to navigate operating systems, manage files, and use productivity software with confidence.',
        'duration': '3 months',
        'level': 'certificate',
        'mode': 'both',
        'intake': 'Jan, May, Sep',
        'order': 1,
        'outcomes': [
            'Operating system basics',
            'File and folder management',
            'Internet and email usage',
            'Word processing skills',
            'Spreadsheet fundamentals',
            'Workplace digital safety',
        ],
        'modules': [
            'Introduction to computers and operating systems',
            'File management and storage',
            'Microsoft Word — documents and formatting',
            'Microsoft Excel — data and formulas',
            'Internet, email, and online communication',
            'Basic cybersecurity and data privacy',
        ],
    },
    {
        'category': 'Computer',
        'title': 'Packages Advanced',
        'image_url': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
        'description': 'Advanced productivity suite training for the modern professional.',
        'overview': 'Building on basic computer literacy, this course dives deep into advanced features of Microsoft Office and Google Workspace. Ideal for those looking to increase workplace efficiency and data management skills.',
        'duration': '4 months',
        'level': 'certificate',
        'mode': 'both',
        'intake': 'Jan, May, Sep',
        'order': 2,
        'outcomes': [
            'Advanced Excel formulas & pivot tables',
            'PowerPoint presentation design',
            'Google Docs & Sheets collaboration',
            'Database fundamentals',
            'Report generation & automation',
            'Professional email management',
        ],
        'modules': [
            'Advanced Microsoft Excel — pivot tables and charts',
            'Microsoft PowerPoint — professional presentations',
            'Google Workspace for collaboration',
            'Introduction to database management',
            'Automated reporting and mail merge',
            'Professional digital communication',
        ],
    },
    {
        'category': 'Computer',
        'title': 'Computer Packages',
        'image_url': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
        'description': 'Comprehensive training across the full Microsoft Office suite.',
        'overview': 'A thorough grounding in all major Microsoft Office applications. This course is ideal for job seekers and professionals who need a recognized qualification in computer packages.',
        'duration': '3 months',
        'level': 'certificate',
        'mode': 'both',
        'intake': 'Jan, May, Sep',
        'order': 3,
        'outcomes': [
            'Word processing and document design',
            'Spreadsheets and data analysis',
            'Presentation creation',
            'Internet research skills',
            'Email and calendar management',
            'Typing speed and accuracy',
        ],
        'modules': [
            'Microsoft Word — beginner to intermediate',
            'Microsoft Excel — beginner to intermediate',
            'Microsoft PowerPoint — slides and design',
            'Microsoft Access — introduction to databases',
            'Outlook and internet skills',
            'Typing and data entry',
        ],
    },

    # ── Catering ──────────────────────────────────────────────
    {
        'category': 'Catering',
        'title': 'Catering',
        'image_url': 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&h=500&fit=crop',
        'description': 'Professional food preparation and kitchen operations training.',
        'overview': 'This comprehensive catering program equips students with foundational and advanced skills in food preparation, kitchen operations, and food safety standards.',
        'duration': '6 months',
        'level': 'certificate',
        'mode': 'both',
        'intake': 'Jan, May, Sep',
        'order': 10,
        'outcomes': [
            'Food hygiene & safety standards',
            'Menu planning & costing',
            'Hot & cold kitchen techniques',
            'Baking and pastry arts',
            'Event & banquet catering',
            'Customer service skills',
        ],
        'modules': [
            'Introduction to professional kitchen operations',
            'Food safety, hygiene & HACCP principles',
            'Basic and advanced cooking methods',
            'Pastry, baking & confectionery',
            'Quantity food production & buffet service',
            'Entrepreneurship in the food industry',
        ],
    },
    {
        'category': 'Catering',
        'title': 'Baking & Pastry',
        'image_url': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
        'description': 'Artisan baking, pastry arts, and confectionery techniques.',
        'overview': 'Focused on the art and science of baking, this course covers everything from artisan bread to elegant pastries. Students gain hands-on experience in a fully equipped bakery kitchen.',
        'duration': '4 months',
        'level': 'certificate',
        'mode': 'full_time',
        'intake': 'Jan, May, Sep',
        'order': 11,
        'outcomes': [
            'Artisan bread making',
            'Cake design and decoration',
            'Pastry and tart production',
            'Chocolate and confectionery',
            'Portion control and costing',
            'Display and presentation',
        ],
        'modules': [
            'Baking science — ingredients and techniques',
            'Bread and dough production',
            'Cakes, cupcakes, and sponges',
            'Pastry — shortcrust, puff, and choux',
            'Chocolate work and sugar craft',
            'Bakery business and customer service',
        ],
    },
    {
        'category': 'Catering',
        'title': 'Hot Kitchen',
        'image_url': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop',
        'description': 'Intensive hot kitchen skills for aspiring professional chefs.',
        'overview': 'This program focuses on professional hot kitchen operations, from stock and sauce preparation to full à la carte service. Students work in a real kitchen environment.',
        'duration': '6 months',
        'level': 'certificate',
        'mode': 'full_time',
        'intake': 'Jan, May, Sep',
        'order': 12,
        'outcomes': [
            'Stock, sauce, and soup production',
            'Meat, poultry & seafood cookery',
            'Vegetable and starch dishes',
            'Kitchen brigade and teamwork',
            'Plating and presentation',
            'Kitchen cost control',
        ],
        'modules': [
            'Kitchen organization and brigade system',
            'Stocks, sauces, and soups',
            'Protein cooking methods',
            'Vegetable, egg, and starch cookery',
            'Restaurant service and plating',
            'Menu design and food costing',
        ],
    },
    {
        'category': 'Catering',
        'title': 'Barista',
        'image_url': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&h=500&fit=crop',
        'description': 'Professional coffee preparation and café service skills.',
        'overview': 'A practical, fast-track course covering professional espresso preparation, milk texturing, latte art, and café operations.',
        'duration': '2 months',
        'level': 'certificate',
        'mode': 'both',
        'intake': 'Every month',
        'order': 13,
        'outcomes': [
            'Espresso extraction and calibration',
            'Milk steaming and texturing',
            'Latte art fundamentals',
            'Coffee origin and tasting',
            'Café customer service',
            'Equipment cleaning and maintenance',
        ],
        'modules': [
            'Coffee origins and varieties',
            'Espresso machine operation',
            'Milk techniques and latte art',
            'Cold brew and specialty drinks',
            'Café service and POS systems',
            'Health, safety, and hygiene',
        ],
    },

    # ── Hair & Beauty ─────────────────────────────────────────
    {
        'category': 'Hair & Beauty',
        'title': 'Cosmetology',
        'image_url': 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=500&fit=crop',
        'description': 'Full cosmetology training covering hair, skin, and nails.',
        'overview': 'A comprehensive diploma program covering all aspects of professional cosmetology — from hair styling and coloring to skincare and nail technology.',
        'duration': '12 months',
        'level': 'diploma',
        'mode': 'full_time',
        'intake': 'Jan, Sep',
        'order': 20,
        'outcomes': [
            'Hair cutting and styling',
            'Chemical treatments and coloring',
            'Skin analysis and facials',
            'Nail care and nail art',
            'Salon management basics',
            'Health and safety regulations',
        ],
        'modules': [
            'Introduction to cosmetology and salon environment',
            'Hair structure, growth, and disorders',
            'Cutting, styling, and finishing techniques',
            'Hair coloring and chemical services',
            'Skincare theory and facial treatments',
            'Nail technology and manicure/pedicure',
            'Salon management and client relations',
        ],
    },
    {
        'category': 'Hair & Beauty',
        'title': 'Beauty Therapy',
        'image_url': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=500&fit=crop',
        'description': 'Professional beauty therapy and skincare treatments.',
        'overview': 'This course trains students in a range of beauty therapy treatments including facials, waxing, massage, and make-up artistry.',
        'duration': '6 months',
        'level': 'certificate',
        'mode': 'both',
        'intake': 'Jan, May, Sep',
        'order': 21,
        'outcomes': [
            'Facial treatments and skin analysis',
            'Body massage techniques',
            'Waxing and threading',
            'Make-up application',
            'Eyebrow and eyelash services',
            'Client consultation skills',
        ],
        'modules': [
            'Anatomy and physiology for beauty therapy',
            'Skincare analysis and facial procedures',
            'Body treatments and massage',
            'Hair removal techniques',
            'Cosmetic make-up artistry',
            'Salon safety, hygiene, and ethics',
        ],
    },
    {
        'category': 'Hair & Beauty',
        'title': 'Hairdressing',
        'image_url': 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&h=500&fit=crop',
        'description': 'Professional hairdressing from cutting to advanced coloring.',
        'overview': 'A practical hairdressing program covering cutting, styling, chemical services, and coloring techniques.',
        'duration': '6 months',
        'level': 'certificate',
        'mode': 'full_time',
        'intake': 'Jan, May, Sep',
        'order': 22,
        'outcomes': [
            'Hair cutting techniques',
            'Blow-drying and finishing',
            'Perming and relaxing',
            'Hair coloring and highlights',
            'Scalp and hair treatments',
            'Client communication',
        ],
        'modules': [
            'Hair science and trichology basics',
            'Sectioning, cutting, and clipper work',
            'Styling and blow-dry techniques',
            'Chemical services — perming and relaxing',
            'Hair coloring, highlights, and corrections',
            'Professional salon practice',
        ],
    },
    {
        'category': 'Hair & Beauty',
        'title': 'Nail Technology',
        'image_url': 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&h=500&fit=crop',
        'description': 'Nail care, extensions, and nail art for salon professionals.',
        'overview': 'A focused nail technology course covering manicure, pedicure, gel nails, acrylic extensions, and creative nail art.',
        'duration': '3 months',
        'level': 'certificate',
        'mode': 'both',
        'intake': 'Jan, May, Sep',
        'order': 23,
        'outcomes': [
            'Manicure and pedicure',
            'Gel and shellac application',
            'Acrylic nail extensions',
            'Nail art and design',
            'Nail health and disorders',
            'Salon hygiene protocols',
        ],
        'modules': [
            'Nail anatomy and common disorders',
            'Classic manicure and pedicure',
            'Gel and shellac systems',
            'Acrylic and hard gel extensions',
            'Nail art — freehand, stamping, and decals',
            'Business skills for nail technicians',
        ],
    },
    {
        'category': 'Hair & Beauty',
        'title': 'Barbering',
        'image_url': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=500&fit=crop',
        'description': 'Professional barbering, fades, and grooming services.',
        'overview': 'An intensive barbering program covering modern cutting techniques, skin fades, beard grooming, and barbershop business skills.',
        'duration': '4 months',
        'level': 'certificate',
        'mode': 'full_time',
        'intake': 'Jan, May, Sep',
        'order': 24,
        'outcomes': [
            'Clipper and scissor cutting',
            'Skin fades and tapers',
            'Beard trimming and shaping',
            'Hot towel shave technique',
            'Hair design and patterns',
            'Barbershop management',
        ],
        'modules': [
            'Barbering history and professional standards',
            'Clipper techniques — guards and fades',
            'Scissor over comb and texturing',
            'Beard and facial hair grooming',
            'Hot towel shave and straight razor',
            'Barbershop business and client management',
        ],
    },

    # ── Housekeeping ──────────────────────────────────────────
    {
        'category': 'Housekeeping',
        'title': 'Housekeeping & Laundry Front Office',
        'image_url': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=500&fit=crop',
        'description': 'Hotel housekeeping, laundry operations, and front office skills.',
        'overview': 'This program prepares students for careers in hotel housekeeping, laundry services, and front office operations.',
        'duration': '4 months',
        'level': 'certificate',
        'mode': 'both',
        'intake': 'Jan, May, Sep',
        'order': 30,
        'outcomes': [
            'Room setup and inspection standards',
            'Linen and laundry management',
            'Front office and check-in procedures',
            'Guest relations and communication',
            'Cleaning chemicals and safety',
            'Hotel industry standards',
        ],
        'modules': [
            'Introduction to the hospitality industry',
            'Housekeeping operations and room standards',
            'Laundry — sorting, washing, and finishing',
            'Front office operations and reservations',
            'Guest communication and service excellence',
            'Health, safety, and cleaning procedures',
        ],
    },
]

CATEGORIES = ['Computer', 'Catering', 'Hair & Beauty', 'Housekeeping']


class Command(BaseCommand):
    help = 'Seeds the database with all AceRich College courses'

    def add_arguments(self, parser):
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Delete all existing courses before seeding',
        )

    def handle(self, *args, **options):
        if options['reset']:
            self.stdout.write('Deleting existing data...')
            Course.objects.all().delete()
            Category.objects.all().delete()

        # Create categories
        cat_map = {}
        for name in CATEGORIES:
            cat, created = Category.objects.get_or_create(
                name=name,
                defaults={'slug': slugify(name)}
            )
            cat_map[name] = cat
            status = '✓ created' if created else '  exists'
            self.stdout.write(f'  Category {status}: {name}')

        # Create courses
        for data in COURSES:
            slug = slugify(data['title'])
            course, created = Course.objects.update_or_create(
                slug=slug,
                defaults={
                    'title':       data['title'],
                    'category':    cat_map[data['category']],
                    'image_url':   data['image_url'],
                    'description': data['description'],
                    'overview':    data['overview'],
                    'duration':    data['duration'],
                    'level':       data['level'],
                    'mode':        data['mode'],
                    'intake':      data['intake'],
                    'order':       data['order'],
                    'is_active':   True,
                }
            )

            if not created:
                course.outcomes.all().delete()
                course.modules.all().delete()

            for i, text in enumerate(data['outcomes'], start=1):
                CourseOutcome.objects.create(course=course, text=text, order=i)

            for i, title in enumerate(data['modules'], start=1):
                CourseModule.objects.create(course=course, title=title, order=i)

            status = '✓ created' if created else '↻ updated'
            self.stdout.write(f'  Course {status}: {data["title"]}')

        self.stdout.write(self.style.SUCCESS(
            f'\nDone! {len(COURSES)} courses seeded across {len(CATEGORIES)} categories.'
        ))